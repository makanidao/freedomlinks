import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-5 pt-20 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl font-bold tracking-tightest text-lime glow-text">
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-bone sm:text-3xl">
          This link doesn&apos;t exist
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ash">
          We deal in links you&apos;ve been looking for — but this isn&apos;t one
          of them. Let&apos;s get you back to the drops.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Button href="/#products">Browse the drops</Button>
        </div>
      </div>
    </section>
  );
}
