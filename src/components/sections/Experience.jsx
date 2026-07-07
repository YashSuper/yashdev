import { motion as Motion, useReducedMotion } from "framer-motion";
import { experience } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";

function TimelineEntry({ job, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal as="li" delay={index * 0.05} className="relative pl-10 sm:pl-14">
      {/* Node */}
      <span
        aria-hidden
        className="absolute -left-3.5 top-0.5 flex h-7 w-7 items-center justify-center"
      >
        <Motion.span
          initial={reduceMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
          className="h-3 w-3 rounded-full bg-accent ring-4 ring-accent-soft"
        />
      </span>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {job.role}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">
          {job.period}
        </p>
      </div>
      <p className="mt-1 text-sm font-medium text-accent">
        {job.company} · <span className="text-muted font-normal">{job.location}</span>
      </p>

      <ul className="mt-4 space-y-2.5">
        {job.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-subtle" />
            {point}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
        {job.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t border-line bg-surface/50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="experience-heading"
              eyebrow="Experience"
              title="Six years, one throughline: ownership"
              description="From shipping my first production Drupal site to leading architecture for enterprise platforms."
            />
          </div>

          <ol className="relative ml-3.5 space-y-14 border-l border-line">
            {experience.map((job, i) => (
              <TimelineEntry key={job.role + job.period} job={job} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
