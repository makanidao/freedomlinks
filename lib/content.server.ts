import "server-only";
import { getProduct, type ProductSlug } from "@/lib/products";

// ─────────────────────────────────────────────────────────────────────────────
// PROTECTED DELIVERY CONTENT
//
// This module is the secure vault for the actual sourcing links and insider
// info each guide delivers. The `server-only` import guarantees it can never be
// bundled into client-side JavaScript. It is read ONLY on the server, ONLY after
// a Stripe payment has been verified (see app/success/page.tsx). Nothing here is
// ever sent to the browser unless payment succeeded.
//
// Swap these entries for your own curated research — the structure is ready.
// ─────────────────────────────────────────────────────────────────────────────

export interface DeliveredLink {
  label: string;
  url: string;
  note: string;
}

export interface DeliveredSection {
  title: string;
  blurb: string;
  links: DeliveredLink[];
}

export interface DeliveredGuide {
  intro: string;
  sections: DeliveredSection[];
  proTips: string[];
}

// Per-product delivered guides. The bundle ("all-vendors") is assembled below
// from these entries, so this base map covers every slug EXCEPT "all-vendors".
const baseContent: Record<Exclude<ProductSlug, "all-vendors">, DeliveredGuide> = {
  sm7b: {
    intro:
      "You're in. Below is the full Shure SM7B sourcing map — the authorized dealers that price fairly, the live price-tracking tools to catch drops, the bundle intel, and the traps to avoid. Bookmark this page.",
    sections: [
      {
        title: "Verified authorized dealers",
        blurb:
          "These are official, authorized Shure dealers — genuine units, full warranty, real returns. Start here before anywhere else.",
        links: [
          {
            label: "Sweetwater",
            url: "https://www.sweetwater.com/store/detail/SM7B--shure-sm7b-cardioid-dynamic-microphone",
            note: "Authorized dealer. Free shipping, 2-year free warranty, frequent bundle deals. The safest default buy.",
          },
          {
            label: "B&H Photo Video",
            url: "https://www.bhphotovideo.com/c/product/449671-REG/Shure_SM7B_SM7B_Cardioid_Dynamic_Microphone.html",
            note: "Authorized dealer. Watch for 'Deal Zone' and Payboo savings — often the lowest effective price.",
          },
          {
            label: "Thomann (EU/UK)",
            url: "https://www.thomann.de/intl/shure_sm7b.htm",
            note: "Europe's best price reference. 3-year warranty and 30-day return-no-questions policy.",
          },
          {
            label: "Guitar Center",
            url: "https://www.guitarcenter.com/Shure/SM7B-Cardioid-Dynamic-Microphone.gc",
            note: "Authorized. Check the 'Used & Vintage' tab for verified open-box at a discount with warranty intact.",
          },
        ],
      },
      {
        title: "Live price tracking & deal alerts",
        blurb:
          "Set these up once and let the deals come to you. The SM7B rarely goes on deep sale — these catch it when it does.",
        links: [
          {
            label: "CamelCamelCamel — Amazon price history",
            url: "https://camelcamelcamel.com/search?sq=shure+sm7b",
            note: "See the true price history and set a drop alert. Only buy the Amazon listing if 'Ships from and sold by Amazon.com'.",
          },
          {
            label: "Shure official — authorized dealer locator",
            url: "https://www.shure.com/en-US/microphones/sm7b",
            note: "Confirms any seller is genuinely authorized. If a seller isn't listed here, treat it as gray-market.",
          },
        ],
      },
      {
        title: "Bundle math (when it's worth it)",
        blurb:
          "The SM7B needs lots of clean gain. A quality inline preamp is the upgrade that actually matters — bundle it only at the right price.",
        links: [
          {
            label: "Cloudlifter CL-1 (Sweetwater)",
            url: "https://www.sweetwater.com/store/detail/CloudlifterCL1--cloud-microphones-cloudlifter-cl-1-mic-activator",
            note: "+25dB clean gain. A real value bundle pairs SM7B + CL-1 — only buy bundled if it beats buying separately.",
          },
        ],
      },
    ],
    proTips: [
      "MSRP is $399 and it rarely dips below ~$359 new. Anything under that from an authorized dealer is a genuine deal — grab it.",
      "Avoid 'too cheap' third-party marketplace listings: no warranty, frequent fakes/relabels, and no real returns.",
      "Open-box from an authorized dealer (Guitar Center, Sweetwater) is the smartest discount — warranty stays intact.",
      "If your interface struggles for gain, factor a Cloudlifter into your budget rather than overpaying for a 'broadcast bundle'.",
    ],
  },

  "chrome-hearts": {
    intro:
      "Welcome in. This is your Chrome Hearts sourcing directory plus the authentication playbook. Use the verified channels below, run every piece through the checklist, and you'll never get burned on a fake.",
    sections: [
      {
        title: "Authentic-only channels",
        blurb:
          "Buy from the brand or from platforms that authenticate before shipping. This is the lowest-risk way to own real Chrome Hearts.",
        links: [
          {
            label: "Chrome Hearts — official",
            url: "https://www.chromehearts.com/",
            note: "The source of truth. CH is famously not sold through most online retailers — official boutiques and the site are ground zero.",
          },
          {
            label: "The RealReal",
            url: "https://www.therealreal.com/shop/chrome-hearts",
            note: "Every piece is authenticated in-house by experts before listing. Strong return policy. Premium but safe.",
          },
          {
            label: "StockX",
            url: "https://stockx.com/brands/chrome-hearts",
            note: "Authenticates each item before it ships to you. Best for current apparel and accessories with transparent market pricing.",
          },
          {
            label: "Vestiaire Collective",
            url: "https://www.vestiairecollective.com/men-accessories/jewellery/chrome-hearts/",
            note: "Optional paid authentication step before delivery — always select it for high-value jewelry.",
          },
        ],
      },
      {
        title: "Authentication checklist",
        blurb:
          "Run every piece through these before you pay a private seller. If anything fails, walk away.",
        links: [
          {
            label: "LegitGrails — Chrome Hearts authentication",
            url: "https://legitgrails.com/",
            note: "Paid human authentication from photos, usually within hours. Worth it on anything over a few hundred dollars.",
          },
        ],
      },
    ],
    proTips: [
      "Check the stamps: genuine CH is crisply stamped (CH Plus, dagger, '.925' on silver). Blurry, shallow, or crooked stamps = fake.",
      "Real sterling silver has weight and patinas over time. Suspiciously light or mirror-shiny 'silver' is a red flag.",
      "Demand the original receipt, dust bag, and box. Verify the font and spacing on tags against official references.",
      "Red flags: prices far below market, stock photos, 'no returns', pushy DMs, and sellers who won't take a requested angle photo.",
      "For private sales, use a paid authentication service first and pay only through buyer-protected methods — never friends-and-family.",
    ],
  },

  "sur-ron": {
    intro:
      "You're set. Below is the Sur-Ron dealer list, model breakdown, and the total-cost intel so there are zero surprises. Buy from a real dealer, verify the specs, and budget for shipping up front.",
    sections: [
      {
        title: "Trusted dealers",
        blurb:
          "Reputable, established Sur-Ron sellers with real inventory, clean shipping, and after-sale support. Start here, not on random marketplaces.",
        links: [
          {
            label: "Sur-Ron USA — official",
            url: "https://sur-ronusa.com/",
            note: "Official US distributor. Genuine bikes, warranty, and a dealer locator for buying local to save on freight.",
          },
          {
            label: "Luna Cycle",
            url: "https://lunacycle.com/electric-bikes/sur-ron/",
            note: "Long-standing reputable dealer with deep Sur-Ron knowledge, upgrades, and responsive support. Excellent first stop.",
          },
        ],
      },
      {
        title: "Model breakdown",
        blurb: "Pick the platform that fits your riding before you shop price.",
        links: [
          {
            label: "Light Bee X — overview",
            url: "https://sur-ronusa.com/products/sur-ron-light-bee-x",
            note: "~110 lb, trail/commuter sweet spot. The right pick for most riders. Easy to transport and mod.",
          },
          {
            label: "Storm Bee — overview",
            url: "https://sur-ronusa.com/products/sur-ron-storm-bee-f",
            note: "Bigger, faster, full-size frame. Choose this only if you specifically need the extra power and size.",
          },
        ],
      },
    ],
    proTips: [
      "Light Bee X fits ~90% of buyers. Don't pay up for the Storm Bee unless you genuinely need the extra power and full-size frame.",
      "Budget for freight/crating — it's often $200–$500+ and the #1 surprise cost. Buying from a local dealer can eliminate it.",
      "Verify the battery: confirm cell spec and controller, and buy from a dealer who honors warranty on the pack.",
      "Factor must-have parts (tubes/tires, a quality charger, protection) into total cost before you decide it's 'cheaper' elsewhere.",
      "Avoid gray-market imports with no US support — warranty and parts headaches cost more than you save.",
    ],
  },

  "cologne-vendor": {
    intro:
      "You're in. Below is your authentic-fragrance sourcing map — the discounters and vendors that sell genuine designer and niche scents, where to sample before you commit to a full bottle, and how to verify any bottle is real and fresh before you pay.",
    sections: [
      {
        title: "Authentic discounters & vendors",
        blurb:
          "Established sellers that move genuine designer and niche fragrance well below boutique retail. Start here before any unknown marketplace seller.",
        links: [
          {
            label: "FragranceNet",
            url: "https://www.fragrancenet.com/",
            note: "Long-running discounter of genuine designer fragrance. Stack the on-site coupon at checkout for the real lowest price.",
          },
          {
            label: "FragranceX",
            url: "https://www.fragrancex.com/",
            note: "Large authentic-fragrance discounter with frequent sales. Strong for mainstream designer houses and travel sizes.",
          },
          {
            label: "Jomashop",
            url: "https://www.jomashop.com/fragrances.html",
            note: "Reputable gray-market discounter — genuine stock at sharp prices. Check the return policy per item before buying.",
          },
          {
            label: "Notino",
            url: "https://www.notino.com/",
            note: "Europe's big authentic-fragrance retailer. Excellent niche selection and decant/travel sizes; ships widely.",
          },
        ],
      },
      {
        title: "Decants & samples (try before you commit)",
        blurb:
          "Sample a scent in 1–5ml poured from a genuine bottle before you ever buy full. The single best way to avoid an expensive blind-buy mistake.",
        links: [
          {
            label: "The Perfumed Court",
            url: "https://theperfumedcourt.com/",
            note: "Trusted decant house. Sample rare, discontinued, and niche fragrances in small sizes before sourcing a full bottle.",
          },
          {
            label: "Scent Split",
            url: "https://scentsplit.com/",
            note: "Decants and samples poured from authentic bottles — ideal for testing niche houses before a full-bottle commitment.",
          },
          {
            label: "MicroPerfumes",
            url: "https://www.microperfumes.com/",
            note: "Authentic travel sizes and samples of both designer and niche scents at low entry prices.",
          },
        ],
      },
      {
        title: "Verify authenticity & batch codes",
        blurb:
          "Run the batch code on any bottle before you pay. Confirms the production date, freshness, and that you're not buying rebottled or expired stock.",
        links: [
          {
            label: "CheckFresh — batch code lookup",
            url: "https://checkfresh.com/",
            note: "Enter the batch code to find the production date. A missing, unreadable, or impossible date is a red flag.",
          },
          {
            label: "CheckCosmetic — batch decoder",
            url: "https://checkcosmetic.net/",
            note: "Cross-check the production date and shelf life across brands before committing to a purchase.",
          },
        ],
      },
    ],
    proTips: [
      "Niche and discontinued scents are where fakes thrive — buy a decant first, confirm it smells right, then source the full bottle.",
      "Run every batch code through a checker before paying. No code, an unreadable code, or an impossible date means walk away.",
      "Gray-market discounters (Jomashop, FragranceNet) sell genuine stock — the discount is real; just confirm the per-item return policy.",
      "Be wary of stock-photo-only listings, prices far below the discounters above, and 'tester' bottles with no cap and no batch code.",
      "Designer is widely discounted; niche rarely is. A niche house at 'half off' from an unknown seller is fake until proven otherwise.",
    ],
  },

  "dyson-vendor": {
    intro:
      "You're set. Below are the trusted channels for authentic Dyson at real prices — the official outlet for certified-refurbished units, authorized retailers, and the checks that keep you from buying a counterfeit or an unsupported import.",
    sections: [
      {
        title: "Authentic Dyson — official & authorized",
        blurb:
          "Genuine units, real warranty, real returns. These are the lowest-risk places to buy and the right reference for what a fair price actually is.",
        links: [
          {
            label: "Dyson — official",
            url: "https://www.dyson.com/",
            note: "Ground truth for current models, specs, and pricing. Register any unit here to confirm its warranty.",
          },
          {
            label: "Dyson Official Outlet (eBay)",
            url: "https://www.ebay.com/str/dysonofficialoutlet",
            note: "Dyson's own certified-refurbished store. Genuine, tested, warrantied units at the best legitimate discounts — the value sweet spot.",
          },
          {
            label: "Best Buy — Dyson",
            url: "https://www.bestbuy.com/site/brands/dyson/",
            note: "Authorized retailer. Genuine stock, real returns, and frequent legitimate sale events worth timing a purchase around.",
          },
          {
            label: "Costco — Dyson",
            url: "https://www.costco.com/dyson.html",
            note: "Authorized; often bundles extra tools and backs it with a strong return policy. A safe place to catch real deals.",
          },
        ],
      },
      {
        title: "Refurbished vs. new",
        blurb:
          "Certified refurbished from Dyson itself is genuine, tested, and warrantied — usually the smartest buy. Treat third-party 'refurb' with caution.",
        links: [
          {
            label: "Dyson Certified Refurbished (eBay Outlet)",
            url: "https://www.ebay.com/str/dysonofficialoutlet",
            note: "Refurb direct from Dyson: genuine parts, tested, and warrantied. Prefer this over any unknown third-party 'refurbished' listing.",
          },
          {
            label: "Dyson — warranty & registration",
            url: "https://www.dyson.com/support/owners",
            note: "Register the serial number to confirm coverage. Genuine new and certified-refurb units register cleanly; clones won't.",
          },
        ],
      },
    ],
    proTips: [
      "Buy genuine: counterfeits are rampant on open marketplaces. Stick to Dyson's official outlet and the authorized retailers above to eliminate the risk.",
      "Dyson's own certified-refurbished (eBay Official Outlet) is the value pick — genuine, tested, and warrantied, often far below new.",
      "Always register the serial number with Dyson. A unit that won't register — or a seller who won't share the serial — is a red flag.",
      "Counterfeit tells: misspelled packaging, no serial, prices far below the official outlet, and 'genuine' units shipped in plain boxes.",
      "For cordless models, factor in a fresh genuine battery and filters — they matter more to long-term value than a slightly lower sticker price.",
    ],
  },

  "sp5der-vendor": {
    intro:
      "You're in. This sourcing map took real digging to put together — the authentic-only channels that never surface on the first page of a search, the platforms that authenticate every piece before it ships, and the exact tells that separate genuine Sp5der from a replica. Lead with verification and you'll skip both the fakes and the resale markup.",
    sections: [
      {
        title: "Authentic-only channels",
        blurb:
          "Buy direct from the brand or from platforms that authenticate every item before it reaches you. This is the lowest-risk way to own real Sp5der without overpaying a reseller.",
        links: [
          {
            label: "Spider Worldwide — official store",
            url: "https://sp5der-worldwide.com/",
            note: "The brand's own store and the source of truth for live drops and pricing. Confirm you're on the official domain before buying — lookalike sites are common.",
          },
          {
            label: "StockX — Sp5der",
            url: "https://stockx.com/brands/sp5der",
            note: "Authenticates each item before it ships to you. Use the live market price here as your reference so you never overpay a private seller.",
          },
          {
            label: "GOAT — Sp5der",
            url: "https://www.goat.com/sp5der",
            note: "In-house authentication on every order. Strong for hoodies and tees; the 'used' tab often has genuine pieces below retail.",
          },
          {
            label: "Grailed — Spider",
            url: "https://www.grailed.com/designers/spider",
            note: "Best for tracking down sold-out pieces, but these are private sales — run the checklist below and pay only buyer-protected before committing.",
          },
        ],
      },
      {
        title: "Authenticate before you pay",
        blurb:
          "On hyped streetwear the replicas are good. A few dollars of paid verification on any private-seller piece saves you the entire purchase price.",
        links: [
          {
            label: "LegitGrails — streetwear authentication",
            url: "https://legitgrails.com/",
            note: "Paid human authentication from photos, usually within hours. Worth it on anything you can't buy through an authenticating platform.",
          },
          {
            label: "CheckCheck — app authentication",
            url: "https://checkcheck.me/",
            note: "Fast human legit-check via app. Send tag, stitching, and print photos before sending a single dollar to a private seller.",
          },
        ],
      },
    ],
    proTips: [
      "Lead with the source, not the deal: buy through an authenticating platform (StockX, GOAT) whenever you can't buy direct from Spider Worldwide.",
      "Check the print and puff — genuine webbing/rhinestone work is dense and evenly applied. Thin, scratchy, or misaligned graphics are a replica tell.",
      "Inspect tags and stitching against official references: wrong font weight, crooked labels, or sloppy interior stitching means walk away.",
      "Red flags on private sales: prices far below the platform market rate, stock photos only, 'no returns', and sellers who won't shoot a requested angle.",
      "For any Grailed/DM sale, get a paid legit check first and pay only through buyer-protected methods — never friends-and-family.",
    ],
  },

  "airpods-max-vendor": {
    intro:
      "You're set. These are the trusted channels for authentic AirPods Max below the standard retail pages — found through real research, not a quick search. Start with Apple's own certified-refurbished outlet and authorized retailers, verify every serial, and you'll land a genuine unit at a real discount with zero counterfeit risk.",
    sections: [
      {
        title: "Authentic AirPods Max — official & authorized",
        blurb:
          "Genuine units, full warranty, real returns. These are the lowest-risk places to buy and the right reference for what a fair price actually is.",
        links: [
          {
            label: "Apple Certified Refurbished",
            url: "https://www.apple.com/shop/refurbished/airpods",
            note: "Apple's own refurb: genuine, fully tested, new battery and outer shell, same 1-year warranty as new. The value sweet spot — check stock often.",
          },
          {
            label: "Best Buy — AirPods Max",
            url: "https://www.bestbuy.com/site/apple-airpods-max/",
            note: "Authorized retailer. Genuine stock, real returns, and frequent legitimate sale events — time a purchase around them for the best new price.",
          },
          {
            label: "Costco — Apple",
            url: "https://www.costco.com/apple-airpods.html",
            note: "Authorized; strong return policy and occasional member pricing below Apple retail. A safe place to catch a real deal.",
          },
          {
            label: "Amazon (sold by Amazon.com)",
            url: "https://www.amazon.com/stores/Apple/page/",
            note: "Only buy when the listing reads 'Ships from and sold by Amazon.com'. Third-party marketplace sellers are where the clones live — skip them.",
          },
        ],
      },
      {
        title: "New vs. refurbished & verification",
        blurb:
          "Certified refurbished direct from Apple is genuine and warrantied — usually the smartest buy. Verify every unit's serial before you pay.",
        links: [
          {
            label: "Back Market — AirPods Max",
            url: "https://www.backmarket.com/",
            note: "Reputable refurb marketplace with graded units and a warranty. A good third-party option when Apple's refurb stock is dry — confirm the grade and return window.",
          },
          {
            label: "Apple — Check Coverage (serial lookup)",
            url: "https://checkcoverage.apple.com/",
            note: "Enter the serial number to confirm a genuine Apple unit and its warranty status. A serial that won't validate is an instant walk-away.",
          },
        ],
      },
    ],
    proTips: [
      "Lead with Apple's certified-refurbished outlet: genuine, tested, new battery and shell, full warranty — usually well below new and lower-risk than any marketplace.",
      "Always run the serial through Apple's Check Coverage before paying. A missing serial, or a seller who won't share it, is a red flag.",
      "Counterfeit tells: a too-light frame, mushy buttons, a fake Digital Crown, misspelled packaging, and prices far below the channels above.",
      "On Amazon and eBay, buy only when it ships from Apple or the platform itself — third-party 'new' AirPods Max at a deep discount are frequently clones.",
      "Factor in replacement ear cushions and a genuine cable when comparing a 'deal' refurb against new — they affect real long-term value.",
    ],
  },

  "alocs-vendor": {
    intro:
      "You're in. This is your ALOCS sourcing map — the authentic-only channels, the platforms that authenticate every piece before it ships, and the exact tells that separate the real thing from a replica. Lead with verification and you'll skip both the fakes and the resale markup.",
    sections: [
      {
        title: "Authentic-only channels",
        blurb:
          "Buy through platforms that authenticate every item before it reaches you, or track down sold-out pieces with buyer protection in place. This is the lowest-risk way to source real ALOCS.",
        links: [
          {
            label: "StockX — search ALOCS",
            url: "https://stockx.com/search?s=alocs",
            note: "Authenticates each item before it ships to you. Use the live market price here as your reference so you never overpay a private seller.",
          },
          {
            label: "GOAT — search ALOCS",
            url: "https://www.goat.com/search?query=alocs",
            note: "In-house authentication on every order. The 'used' tab often surfaces genuine pieces below retail — check it before paying full.",
          },
          {
            label: "Grailed",
            url: "https://www.grailed.com/",
            note: "Best for hunting down sold-out pieces, but these are private sales — run the checklist below and pay only buyer-protected before committing.",
          },
        ],
      },
      {
        title: "Authenticate before you pay",
        blurb:
          "On hyped pieces the replicas are good. A few dollars of paid verification on any private-seller item saves you the entire purchase price.",
        links: [
          {
            label: "LegitGrails — streetwear authentication",
            url: "https://legitgrails.com/",
            note: "Paid human authentication from photos, usually within hours. Worth it on anything you can't buy through an authenticating platform.",
          },
          {
            label: "CheckCheck — app authentication",
            url: "https://checkcheck.me/",
            note: "Fast human legit-check via app. Send tag, stitching, and print photos before sending a single dollar to a private seller.",
          },
        ],
      },
    ],
    proTips: [
      "Lead with the source, not the deal: buy through an authenticating platform (StockX, GOAT) whenever you can't buy direct.",
      "Inspect tags and stitching against official references: wrong font weight, crooked labels, or sloppy interior stitching means walk away.",
      "Check the print and hardware — genuine work is dense and evenly applied. Thin, scratchy, or misaligned graphics are a replica tell.",
      "Red flags on private sales: prices far below the platform market rate, stock photos only, 'no returns', and sellers who won't shoot a requested angle.",
      "For any DM/Grailed sale, get a paid legit check first and pay only through buyer-protected methods — never friends-and-family.",
    ],
  },

  "hellstar-vendor": {
    intro:
      "You're set. This is your Hellstar sourcing directory plus the authentication playbook — the authentic-only channels, the platforms that verify every piece before it ships, and the tells that separate real heat from a fake. Verify first and you'll never get burned.",
    sections: [
      {
        title: "Authentic-only channels",
        blurb:
          "Buy direct from the brand or from platforms that authenticate every item before it reaches you. This is the lowest-risk way to own real Hellstar without overpaying a reseller.",
        links: [
          {
            label: "Hellstar — official store",
            url: "https://hellstarclothing.shop/",
            note: "The brand's own store and the source of truth for live drops and pricing. Confirm you're on the official domain before buying — lookalike sites are common.",
          },
          {
            label: "StockX — Hellstar",
            url: "https://stockx.com/brands/hellstar",
            note: "Authenticates each item before it ships to you. Use the live market price here as your reference so you never overpay a private seller.",
          },
          {
            label: "GOAT — search Hellstar",
            url: "https://www.goat.com/search?query=hellstar",
            note: "In-house authentication on every order. Strong for hoodies and tees; the 'used' tab often has genuine pieces below retail.",
          },
          {
            label: "Grailed — Hellstar",
            url: "https://www.grailed.com/designers/hellstar",
            note: "Best for tracking down sold-out pieces, but these are private sales — run the checklist below and pay only buyer-protected before committing.",
          },
        ],
      },
      {
        title: "Authenticate before you pay",
        blurb:
          "On hyped streetwear the replicas are good. A few dollars of paid verification on any private-seller piece saves you the entire purchase price.",
        links: [
          {
            label: "LegitGrails — streetwear authentication",
            url: "https://legitgrails.com/",
            note: "Paid human authentication from photos, usually within hours. Worth it on anything you can't buy through an authenticating platform.",
          },
          {
            label: "CheckCheck — app authentication",
            url: "https://checkcheck.me/",
            note: "Fast human legit-check via app. Send tag, stitching, and print photos before sending a single dollar to a private seller.",
          },
        ],
      },
    ],
    proTips: [
      "Lead with the source, not the deal: buy through an authenticating platform (StockX, GOAT) whenever you can't buy direct from the official store.",
      "Check the print and puff — genuine graphics are dense and evenly applied. Thin, scratchy, or misaligned prints are a replica tell.",
      "Inspect tags and stitching against official references: wrong font weight, crooked labels, or sloppy interior stitching means walk away.",
      "Red flags on private sales: prices far below the platform market rate, stock photos only, 'no returns', and sellers who won't shoot a requested angle.",
      "For any Grailed/DM sale, get a paid legit check first and pay only through buyer-protected methods — never friends-and-family.",
    ],
  },

  "meta-vendor": {
    intro:
      "You're set. These are the trusted channels for authentic Meta hardware — Quest headsets and Ray-Ban Meta smart glasses — below the standard retail pages. Start with Meta's own store and authorized retailers, verify every serial, and you'll land a genuine unit at a real price with zero counterfeit risk.",
    sections: [
      {
        title: "Authentic Meta hardware — official & authorized",
        blurb:
          "Genuine units, full warranty, real returns. These are the lowest-risk places to buy and the right reference for what a fair price actually is.",
        links: [
          {
            label: "Meta Store — official",
            url: "https://www.meta.com/quest/",
            note: "Ground truth for current Quest and Ray-Ban Meta models, specs, and pricing. Register any unit to confirm its warranty.",
          },
          {
            label: "Best Buy — Meta Quest",
            url: "https://www.bestbuy.com/site/virtual-reality/meta-quest/pcmcat1633casnci.c",
            note: "Authorized retailer. Genuine stock, real returns, and frequent legitimate sale events — time a purchase around them for the best price.",
          },
          {
            label: "Ray-Ban — Meta smart glasses (official)",
            url: "https://www.ray-ban.com/usa/ray-ban-meta-smart-glasses",
            note: "The source of truth for genuine Ray-Ban Meta. Confirm frame/lens options here before buying anywhere else so you know a fair price.",
          },
          {
            label: "Amazon (sold by Amazon.com)",
            url: "https://www.amazon.com/stores/Meta/page/",
            note: "Only buy when the listing reads 'Ships from and sold by Amazon.com'. Third-party marketplace sellers are where the clones live — skip them.",
          },
        ],
      },
      {
        title: "Refurbished & verification",
        blurb:
          "Certified refurbished direct from Meta is genuine and warrantied — usually the smartest discount. Verify every unit's serial before you pay.",
        links: [
          {
            label: "Meta Certified Refurbished",
            url: "https://www.meta.com/quest/refurbished/",
            note: "Meta's own refurb: genuine, fully tested, with warranty. The value sweet spot when in stock — check availability often.",
          },
          {
            label: "Meta — warranty & device support",
            url: "https://www.meta.com/help/quest/",
            note: "Register the serial number to confirm coverage. Genuine units register cleanly; clones and gray-market imports won't.",
          },
        ],
      },
    ],
    proTips: [
      "Lead with Meta's own store and certified-refurbished outlet: genuine, tested, full warranty — usually the lowest-risk buy at a fair price.",
      "Always register the serial number with Meta before relying on a unit. A missing serial, or a seller who won't share it, is a red flag.",
      "Counterfeit/clone tells: misspelled packaging, no serial, prices far below the channels above, and 'sealed' units shipped in plain boxes.",
      "On Amazon and eBay, buy only when it ships from Meta or the platform itself — third-party 'new' units at a deep discount are frequently fakes.",
      "For Ray-Ban Meta, confirm the exact frame and lens combo on Ray-Ban's official page — knockoffs copy the look but not the genuine electronics.",
    ],
  },

  coaching: {
    intro:
      "Welcome in. This is your reselling operations playbook — the platforms to sell on, the accounts and tools to set up, and the sourcing-and-pricing strategy to scale from your first flip to a regional operation. Work through the sections in order; each link is a piece of the system.",
    sections: [
      {
        title: "Where to sell",
        blurb:
          "The marketplaces that move volume. Start on one, master it, then expand. Each has its own fees, audience, and best-fit categories.",
        links: [
          {
            label: "eBay — Seller Center",
            url: "https://www.ebay.com/sellercenter/selling",
            note: "The workhorse for almost any category. Best buyer reach and price-research tools. Start here before anywhere else.",
          },
          {
            label: "Whatnot",
            url: "https://www.whatnot.com/",
            note: "Live-auction selling that moves inventory fast — strong for streetwear, sneakers, and collectibles. Apply early; approval can take time.",
          },
          {
            label: "Mercari",
            url: "https://www.mercari.com/",
            note: "Low-friction listings and a casual buyer base. Good for clearing general inventory and testing what sells before scaling.",
          },
          {
            label: "StockX",
            url: "https://stockx.com/sell",
            note: "Authenticated marketplace for hyped sneakers and apparel. Predictable market pricing makes it easy to source-to-flip with known margins.",
          },
        ],
      },
      {
        title: "Accounts & tools to set up",
        blurb:
          "The infrastructure that separates a hobby from a business. Set these up early so your money, taxes, and bookkeeping stay clean as you scale.",
        links: [
          {
            label: "PayPal — Business account",
            url: "https://www.paypal.com/us/business",
            note: "Keep business payments separate from personal from day one. Cleaner bookkeeping and easier taxes when volume grows.",
          },
          {
            label: "U.S. Small Business Administration — register a business",
            url: "https://www.sba.gov/business-guide/launch-your-business/register-your-business",
            note: "The official guide to registering your business and getting set up legally. Do this before you scale, not after.",
          },
          {
            label: "IRS — Employer ID Number (EIN)",
            url: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number",
            note: "Free, official EIN application. Lets you open business accounts and keep your SSN off marketplace and wholesale paperwork.",
          },
        ],
      },
      {
        title: "Sourcing & pricing strategy",
        blurb:
          "Margin is made when you buy, not when you sell. Use these to research real market prices and source inventory at the right cost.",
        links: [
          {
            label: "eBay — completed/sold listings filter",
            url: "https://www.ebay.com/sl/sell",
            note: "Filter to 'Sold items' to see what things ACTUALLY sell for, not asking prices. Your single most important pricing tool.",
          },
          {
            label: "130point — real sold-price lookup",
            url: "https://130point.com/sales/",
            note: "Pulls real sold prices including best-offer accepted amounts eBay hides. Price and source against true market, not list price.",
          },
        ],
      },
    ],
    proTips: [
      "Pick ONE platform and master it before adding a second. Spreading thin early is the most common reason new resellers stall.",
      "Price off SOLD listings, never asking prices. What a thing is listed for and what it actually sells for are very different numbers.",
      "Separate business money from personal from day one — a dedicated payment account and (when you scale) an EIN save you a tax-season nightmare.",
      "Reinvest early profits into more inventory instead of pulling them out. Compounding your buy budget is how a side hustle becomes regional.",
      "Track every cost — item, shipping, fees, supplies — so your 'profit' is real profit. Most beginners overstate margins by ignoring fees.",
    ],
  },
};

// ── Bundle assembly ─────────────────────────────────────────────────────────
// "All My Vendors" delivers every individual VENDOR guide's sourcing sections in
// one place. We stitch them together here (prefixing each section with the
// product name) so the success page and DeliveryReveal need no special-casing.
const BUNDLE_SLUGS: Exclude<ProductSlug, "all-vendors">[] = [
  "sm7b",
  "chrome-hearts",
  "sur-ron",
  "cologne-vendor",
  "dyson-vendor",
  "sp5der-vendor",
  "airpods-max-vendor",
  "alocs-vendor",
  "hellstar-vendor",
  "meta-vendor",
];

const allVendorsGuide: DeliveredGuide = {
  intro:
    "You unlocked everything. Below is the complete FreedomLinks vault — every vendor guide stitched into one map, grouped by product. Each section carries the same verified channels, authentication checks, and pricing intel as the standalone guides. Bookmark this page; it's your whole sourcing operation in one place.",
  sections: BUNDLE_SLUGS.flatMap((slug) => {
    const name = getProduct(slug)?.name ?? slug;
    return baseContent[slug].sections.map((section) => ({
      ...section,
      title: `${name} · ${section.title}`,
    }));
  }),
  proTips: [
    "Lead with verification on every category: buy through authenticating platforms or official/authorized dealers before any private seller.",
    "Price off real SOLD data, not asking prices — it applies whether you're buying a mic, a hoodie, or a pair of headphones.",
    "Bookmark this page. It's the combined vault for every guide, so you never have to re-hunt a single source.",
  ],
};

const content: Record<ProductSlug, DeliveredGuide> = {
  ...baseContent,
  "all-vendors": allVendorsGuide,
};

export function getDeliveredContent(slug: ProductSlug): DeliveredGuide {
  return content[slug];
}
