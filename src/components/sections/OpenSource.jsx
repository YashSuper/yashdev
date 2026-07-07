import { GitFork } from "lucide-react";
import { openSource } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

const languageDot = {
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
};

export default function OpenSource() {
  return (
    <section
      id="open-source"
      aria-labelledby="oss-heading"
      className="scroll-mt-24 border-t border-line bg-surface/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="oss-heading"
          eyebrow="Open source"
          title="Tools extracted from real projects"
          description="Libraries born inside production systems, generalized and shared."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {openSource.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.07}>
              <a
                href={repo.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-2 text-foreground">
                  <GitFork size={15} className="text-subtle" aria-hidden />
                  <h3 className="font-mono text-sm font-semibold group-hover:text-accent transition-colors">
                    {repo.name}
                  </h3>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {repo.description}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full ${languageDot[repo.language] ?? "bg-subtle"}`}
                    />
                    {repo.language}
                  </span>
                  <span>{repo.stats}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
