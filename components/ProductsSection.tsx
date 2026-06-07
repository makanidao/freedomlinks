import { Section, SectionHeading } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export function ProductsSection() {
  return (
    <Section id="products">
      <SectionHeading
        eyebrow="The Drops"
        title="Seven vendors. Zero guesswork."
        description="Each drop is a complete sourcing package — verified sellers, current pricing, and the insider details that get you the real deal."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </div>
    </Section>
  );
}
