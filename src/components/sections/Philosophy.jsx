import { philosophy } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="scroll-mt-24 border-t border-line bg-surface/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="philosophy-heading"
          eyebrow="Engineering philosophy"
          title="How I think about frontend"
          description="Principles I've paid for with production incidents, migrations, and team retros — not slogans."
        />

        <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {philosophy.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} className="relative pl-14">
              <span
                aria-hidden
                className="absolute left-0 top-0 font-mono text-2xl font-semibold text-accent/40"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {p.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
