import { skillGroups } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="skills-heading"
          eyebrow="Capabilities"
          title="Depth where it matters"
          description="Not a wall of logos — the areas I've gone deep in, and what I actually use them for."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 3) * 0.07}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {group.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{group.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-line bg-background px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
