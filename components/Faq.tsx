import { Section, SectionHeading } from "@/components/Section";
import { Accordion, type AccordionItem } from "@/components/Accordion";

const faqs: AccordionItem[] = [
  {
    question: "Is this legit?",
    answer:
      "Completely. FreedomLinks sells curated research — vendor lists that point you to legitimate, verified sellers and dealers for real products. Think of it as paying for the homework so you don't waste hours hunting or get burned by scams and fakes. Everything we list is vetted before it goes in a vendor list.",
  },
  {
    question: "How do I get my links after I pay?",
    answer:
      "Instantly. After your payment clears through Stripe, you're redirected to a secure delivery page that unlocks your full vendor list — every sourcing link and insider note — right then and there. There's no waiting on an email and nothing to install. Bookmark the page or save the details so you always have them.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Yes. All checkout is handled by Stripe, a globally trusted, PCI-compliant payment processor. Your card details are entered on Stripe's encrypted checkout and never touch our servers. We only receive a confirmation that your payment succeeded — nothing sensitive.",
  },
  {
    question: "What if I have a question or a link isn't working?",
    answer:
      "Reach out any time through our contact page and we'll help. If something in a vendor list ever goes stale, let us know and we'll point you to the current best source. We stand behind every drop.",
  },
  {
    question: "Do the links stay updated?",
    answer:
      "That's the whole point. Markets move, prices shift, and sellers come and go — so our vendor lists are built around where the real deals are right now, with the tools and trackers you need to keep finding them. We revisit our sources to keep each vendor list current and dependable.",
  },
  {
    question: "What exactly am I buying?",
    answer:
      "Digital sourcing intelligence: a verified seller directory, current best-deal guidance, authentication and red-flag checks where relevant, and pricing benchmarks — everything you need to buy the product with confidence. You're paying once for insider knowledge that saves you money and protects you from getting scammed.",
  },
];

export function Faq() {
  return (
    <Section id="faq" panel>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered straight"
          description="No fine print, no runaround. Here's everything you want to know before you grab a drop."
        />
        <div>
          <Accordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
