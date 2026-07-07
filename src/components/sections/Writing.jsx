import { ArrowUpRight } from "lucide-react";
import { articles } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";

export default function Writing() {
  return (
    <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="writing-heading"
          eyebrow="Writing"
          title="Notes from production"
          description="Long-form technical writing on the systems I've built and broken."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 0.07}>
              <a
                href={article.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <Badge className="text-accent border-accent/25 bg-accent-soft">
                    {article.tag}
                  </Badge>
                  <ArrowUpRight
                    size={17}
                    aria-hidden
                    className="text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-foreground">
                  {article.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {article.description}
                </p>
                <p className="mt-5 font-mono text-xs text-subtle">{article.readTime}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
