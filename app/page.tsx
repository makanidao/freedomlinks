import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyFreedomLinks } from "@/components/WhyFreedomLinks";
import { Faq } from "@/components/Faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <HowItWorks />
      <WhyFreedomLinks />
      <Faq />
    </>
  );
}
