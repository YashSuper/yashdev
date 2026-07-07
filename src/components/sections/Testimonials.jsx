import { Quote } from "lucide-react";
import { testimonials } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Testimonials"
          title="What teams say about working with me"
          description="From LinkedIn recommendations — managers and engineers I've shipped with."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.07}
              as="figure"
              className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <Quote size={18} className="text-accent/50" aria-hidden />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                {t.href ? (
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {t.name}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                )}
                <p className="mt-0.5 text-xs text-muted">{t.role}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
