import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductArtProps {
  product: Product;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
}

// Renders a product's "image area": the cover photo filling the panel when one
// is set, falling back to a branded gradient + monogram so the store still
// renders cleanly if an asset is missing. The gradient also sits behind the
// image as a backdrop while it loads.
export function ProductArt({
  product,
  className,
  aspect = "aspect-[4/3]",
}: ProductArtProps) {
  const { artwork, category, image, name } = product;
  return (
    <div
      className={[
        "grain relative w-full overflow-hidden rounded-2xl border border-ink-600",
        aspect,
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundImage: `linear-gradient(150deg, ${artwork.from} 0%, ${artwork.to} 100%)`,
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-radial-spot" aria-hidden="true" />
          <div className="absolute inset-0 z-10 grid place-items-center">
            <span className="select-none font-display text-6xl font-bold tracking-tighter text-bone/90 glow-text sm:text-7xl">
              {artwork.monogram}
            </span>
          </div>
        </>
      )}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink/80 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute left-5 top-5 z-10">
        <span className="rounded-full border border-ink-600 bg-ink/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ash backdrop-blur">
          {category}
        </span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-ash">
          FreedomLinks
        </span>
        <span className="h-2 w-2 rounded-full bg-lime shadow-glow" />
      </div>
    </div>
  );
}
