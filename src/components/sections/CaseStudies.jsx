import { useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Landmark,
  Lightbulb,
  Puzzle,
  TrendingUp,
  UserRound,
  Wrench,
} from "lucide-react";
import { caseStudies } from "../../data/portfolio";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import Reveal from "../ui/Reveal";
import { cn } from "../../lib/utils";

function DetailBlock({ icon: Icon, title, children }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon size={15} className="text-accent" aria-hidden />
        {title}
      </h4>
      <div className="mt-2 text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

function ProjectVisual({ study, index }) {
  // Stylized "terminal" visual standing in for screenshots.
  // Swap with real product imagery when available.
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-line bg-surface-raised shadow-card"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 truncate font-mono text-[11px] text-subtle">
          {study.id}.mdx
        </span>
      </div>
      <div className="space-y-2.5 p-5 font-mono text-[11px] leading-relaxed sm:text-xs">
        <p className="text-subtle">
          <span className="text-accent">const</span> project = {"{"}
        </p>
        <p className="pl-5 text-muted">
          name: <span className="text-accent">"{study.title}"</span>,
        </p>
        <p className="pl-5 text-muted">
          role: <span className="text-accent">"{study.role.split("—")[0].trim()}"</span>,
        </p>
        <p className="pl-5 text-muted">
          impact: [
          {study.impact.slice(0, 2).map((im, i) => (
            <span key={i} className="block pl-5 text-success">"{im}",</span>
          ))}
          <span className="block">],</span>
        </p>
        <p className="text-subtle">{"}"}</p>
        <p className="text-subtle">
          <span className="text-accent">export default</span> project;{" "}
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-accent align-middle" />
        </p>
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? "80%" : "20%"} 120%, var(--glow), transparent 60%)`,
        }}
      />
    </div>
  );
}

function CaseStudyCard({ study, index }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const detailId = `case-${study.id}-details`;

  return (
    <Reveal as="article" className="group">
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-line bg-surface shadow-card",
          "transition-shadow duration-300 hover:shadow-card-hover"
        )}
      >
        <div
          className={cn(
            "grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center",
            index % 2 === 1 && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Narrative */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-subtle">
                0{index + 1}
              </span>
              <Badge className="text-accent border-accent/25 bg-accent-soft">
                {study.tag}
              </Badge>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {study.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{study.summary}</p>

            {/* Impact — always visible, this is what recruiters scan for */}
            <ul className="mt-6 space-y-2" aria-label="Impact">
              {study.impact.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                  <TrendingUp size={15} className="mt-0.5 shrink-0 text-success" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
              {study.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={detailId}
              className={cn(
                "mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent",
                "transition-opacity hover:opacity-80 cursor-pointer"
              )}
            >
              {open ? "Collapse case study" : "Read the full case study"}
              <ChevronDown
                size={16}
                aria-hidden
                className={cn("transition-transform duration-300", open && "rotate-180")}
              />
            </button>
          </div>

          <ProjectVisual study={study} index={index} />
        </div>

        {/* Expandable engineering deep-dive */}
        <AnimatePresence initial={false}>
          {open && (
            <Motion.div
              id={detailId}
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 border-t border-line p-6 sm:p-10 md:grid-cols-2">
                <DetailBlock icon={Puzzle} title="The business problem">
                  {study.problem}
                </DetailBlock>
                <DetailBlock icon={UserRound} title="My role">
                  {study.role}
                </DetailBlock>
                <DetailBlock icon={Landmark} title="Architecture decisions">
                  <ul className="list-disc space-y-1.5 pl-4">
                    {study.architecture.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </DetailBlock>
                <DetailBlock icon={Wrench} title="Technical challenges & solution">
                  <ul className="list-disc space-y-1.5 pl-4">
                    {study.challenges.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <p className="mt-3">{study.solution}</p>
                </DetailBlock>
                <DetailBlock icon={Lightbulb} title="Lessons learned">
                  <p className="italic">{study.lessons}</p>
                </DetailBlock>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="work-heading"
          eyebrow="Selected work"
          title="Engineering case studies, not screenshots"
          description="Three enterprise products I led or architected — with the problems, trade-offs, and measurable outcomes behind each."
        />
        <div className="mt-14 space-y-10">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
