import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { getProduct, isProductSlug, type ProductSlug } from "@/lib/products";
import { getDeliveredContent, type DeliveredGuide } from "@/lib/content.server";

export const runtime = "nodejs";
// The PDF is generated per-request from payment-gated content — never cache it.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// SECURE GUIDE DOWNLOAD
//
// Returns the purchased guide as a downloadable PDF. Access is gated exactly like
// the /success page: we re-verify the Stripe Checkout Session server-side and
// only read the protected content (lib/content.server.ts) once the payment is
// confirmed paid + complete. Nothing is generated or returned without a verified
// payment for a real product.
// ─────────────────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return new NextResponse("Missing session_id.", { status: 400 });
  }

  if (!isStripeConfigured()) {
    return new NextResponse("Payments aren't configured on this site yet.", {
      status: 503,
    });
  }

  let slug: ProductSlug;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Only a fully paid, completed session unlocks content — same gate as /success.
    if (session.payment_status !== "paid" || session.status !== "complete") {
      return new NextResponse(
        "We couldn't confirm a completed payment for this session.",
        { status: 403 }
      );
    }

    const candidate =
      session.metadata?.slug ?? session.client_reference_id ?? "";
    if (!isProductSlug(candidate)) {
      return new NextResponse(
        "Payment verified, but we couldn't match it to a product.",
        { status: 404 }
      );
    }
    slug = candidate;
  } catch {
    return new NextResponse(
      "We couldn't verify this payment. The link may be invalid or expired.",
      { status: 403 }
    );
  }

  // Payment verified — only now do we read the protected content.
  const product = getProduct(slug)!;
  const guide = getDeliveredContent(slug);

  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await buildGuidePdf(product.name, guide);
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF generation failed.";
    console.error("[download] failed to build PDF:", message);
    return new NextResponse("We couldn't generate your download. Please try again.", {
      status: 500,
    });
  }

  const fileSlug = slug.replace(/[^a-z0-9-]/gi, "");
  const filename = `${fileSlug}-freedomlinks-guide.pdf`;

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(pdfBytes.byteLength),
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

// ── PDF rendering ────────────────────────────────────────────────────────────

const PAGE_WIDTH = 612; // US Letter
const PAGE_HEIGHT = 792;
const MARGIN = 54;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const BOTTOM_LIMIT = MARGIN + 24; // leave room for the footer

const INK = rgb(0.1, 0.11, 0.12);
const MUTED = rgb(0.42, 0.44, 0.46);
const LINKBLUE = rgb(0.13, 0.34, 0.74);
const ACCENT = rgb(0.33, 0.52, 0.12);
const HAIRLINE = rgb(0.85, 0.86, 0.87);

/**
 * Standard fonts use WinAnsi (CP1252) encoding. Replace anything outside that
 * range so generation can never throw on an unexpected character (e.g. an emoji
 * added to the content later). Smart punctuation that CP1252 supports (em/en
 * dashes, curly quotes, bullets, middle dot, ellipsis) is preserved as-is.
 */
function sanitize(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.codePointAt(0)!;
    if (code === 0x09) {
      out += " ";
    } else if (code === 0x0a || code === 0x0d) {
      out += " ";
    } else if (
      (code >= 0x20 && code <= 0x7e) || // ASCII printable
      (code >= 0xa0 && code <= 0xff) // Latin-1 supplement
    ) {
      out += ch;
    } else {
      // CP1252 high-punctuation that WinAnsi can render.
      const cp1252: Record<number, string> = {
        0x20ac: "€", // €
        0x2018: "‘", // '
        0x2019: "’", // '
        0x201c: "“", // "
        0x201d: "”", // "
        0x2013: "–", // –
        0x2014: "—", // —
        0x2022: "•", // •
        0x2026: "…", // …
        0x2122: "™", // ™
        0x2039: "‹",
        0x203a: "›",
      };
      out += cp1252[code] ?? "";
    }
  }
  return out;
}

function wrapLines(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
): string[] {
  const words = sanitize(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  const widthOf = (s: string) => font.widthOfTextAtSize(s, size);

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (widthOf(candidate) <= maxWidth || !current) {
      // If a single word is wider than the line, hard-break it by characters.
      if (!current && widthOf(word) > maxWidth) {
        let chunk = "";
        for (const char of word) {
          if (widthOf(chunk + char) > maxWidth && chunk) {
            lines.push(chunk);
            chunk = char;
          } else {
            chunk += char;
          }
        }
        current = chunk;
      } else {
        current = candidate;
      }
    } else {
      lines.push(current);
      current = word;
      if (widthOf(current) > maxWidth) {
        let chunk = "";
        for (const char of current) {
          if (widthOf(chunk + char) > maxWidth && chunk) {
            lines.push(chunk);
            chunk = char;
          } else {
            chunk += char;
          }
        }
        current = chunk;
      }
    }
  }
  if (current) lines.push(current);
  return lines.length ? lines : [""];
}

async function buildGuidePdf(
  productName: string,
  guide: DeliveredGuide
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`${productName} — FreedomLinks sourcing guide`);
  doc.setCreator("FreedomLinks");
  doc.setProducer("FreedomLinks");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const oblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const pages: PDFPage[] = [];
  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  pages.push(page);
  let y = PAGE_HEIGHT - MARGIN;

  const newPage = () => {
    page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pages.push(page);
    y = PAGE_HEIGHT - MARGIN;
  };

  const ensure = (needed: number) => {
    if (y - needed < BOTTOM_LIMIT) newPage();
  };

  /** Draw a wrapped paragraph. Returns nothing; advances `y`. */
  const drawParagraph = (
    text: string,
    opts: {
      font: PDFFont;
      size: number;
      color?: ReturnType<typeof rgb>;
      lineHeight?: number;
      indent?: number;
      gapAfter?: number;
    }
  ) => {
    const {
      font,
      size,
      color = INK,
      lineHeight = size * 1.38,
      indent = 0,
      gapAfter = 0,
    } = opts;
    const lines = wrapLines(text, font, size, CONTENT_WIDTH - indent);
    for (const line of lines) {
      ensure(lineHeight);
      y -= lineHeight;
      page.drawText(line, {
        x: MARGIN + indent,
        y,
        size,
        font,
        color,
      });
    }
    y -= gapAfter;
  };

  // ── Header ────────────────────────────────────────────────────────────────
  drawParagraph("FreedomLinks", {
    font: bold,
    size: 10,
    color: ACCENT,
    lineHeight: 13,
  });
  drawParagraph(productName, {
    font: bold,
    size: 22,
    color: INK,
    lineHeight: 26,
  });
  drawParagraph("Your verified sourcing guide — keep this file safe.", {
    font: oblique,
    size: 10,
    color: MUTED,
    lineHeight: 14,
    gapAfter: 10,
  });

  // Divider
  ensure(8);
  y -= 8;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: HAIRLINE,
  });
  y -= 6;

  // ── Intro ───────────────────────────────────────────────────────────────
  drawParagraph(guide.intro, {
    font: regular,
    size: 11,
    color: INK,
    lineHeight: 16,
    gapAfter: 14,
  });

  // ── Sections ────────────────────────────────────────────────────────────
  guide.sections.forEach((section, idx) => {
    const number = String(idx + 1).padStart(2, "0");
    // Keep the section heading with at least its first line of blurb.
    ensure(40);
    y -= 6;
    // number + title on one baseline
    const numberText = `${number}  `;
    const numberWidth = bold.widthOfTextAtSize(numberText, 13);
    ensure(18);
    y -= 18;
    page.drawText(numberText, {
      x: MARGIN,
      y,
      size: 13,
      font: bold,
      color: ACCENT,
    });
    // Title may wrap; render first line inline after the number, remainder below.
    const titleLines = wrapLines(
      section.title,
      bold,
      13,
      CONTENT_WIDTH - numberWidth
    );
    page.drawText(titleLines[0], {
      x: MARGIN + numberWidth,
      y,
      size: 13,
      font: bold,
      color: INK,
    });
    for (let i = 1; i < titleLines.length; i++) {
      ensure(17);
      y -= 17;
      page.drawText(titleLines[i], {
        x: MARGIN + numberWidth,
        y,
        size: 13,
        font: bold,
        color: INK,
      });
    }
    y -= 4;

    drawParagraph(section.blurb, {
      font: oblique,
      size: 9.5,
      color: MUTED,
      lineHeight: 13,
      gapAfter: 6,
    });

    section.links.forEach((link) => {
      // Keep a link's label + url together.
      ensure(30);
      drawParagraph(link.label, {
        font: bold,
        size: 11,
        color: INK,
        lineHeight: 15,
        indent: 12,
      });
      drawParagraph(link.url, {
        font: regular,
        size: 9,
        color: LINKBLUE,
        lineHeight: 12,
        indent: 12,
      });
      drawParagraph(link.note, {
        font: regular,
        size: 10,
        color: INK,
        lineHeight: 14,
        indent: 12,
        gapAfter: 8,
      });
    });
  });

  // ── Pro tips ────────────────────────────────────────────────────────────
  y -= 6;
  ensure(28);
  y -= 18;
  page.drawText("Pro tips", { x: MARGIN, y, size: 14, font: bold, color: INK });
  y -= 4;
  guide.proTips.forEach((tip) => {
    ensure(16);
    // bullet
    y -= 14;
    page.drawText("•", {
      x: MARGIN,
      y,
      size: 11,
      font: bold,
      color: ACCENT,
    });
    y += 14; // restore; drawParagraph manages its own advance
    drawParagraph(tip, {
      font: regular,
      size: 10,
      color: INK,
      lineHeight: 14,
      indent: 14,
      gapAfter: 4,
    });
  });

  // ── Footer on every page ──────────────────────────────────────────────────
  const total = pages.length;
  pages.forEach((p, i) => {
    p.drawText(
      sanitize(
        `FreedomLinks · ${productName} · delivered after verified payment`
      ),
      {
        x: MARGIN,
        y: MARGIN - 12,
        size: 8,
        font: regular,
        color: MUTED,
      }
    );
    const pageLabel = `${i + 1} / ${total}`;
    const labelWidth = regular.widthOfTextAtSize(pageLabel, 8);
    p.drawText(pageLabel, {
      x: PAGE_WIDTH - MARGIN - labelWidth,
      y: MARGIN - 12,
      size: 8,
      font: regular,
      color: MUTED,
    });
  });

  return doc.save();
}
