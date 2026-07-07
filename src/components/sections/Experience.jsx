import { useRef, useState } from "react";
import {
  motion as Motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { experience } from "../../data/portfolio";
import { useDeviceProfile } from "../../hooks/useDeviceProfile";
import { useDeviceTilt } from "../../hooks/useDeviceTilt";
import SectionHeading from "../ui/SectionHeading";
import Badge from "../ui/Badge";
import { cn } from "../../lib/utils";

/**
 * Experience section, three variants:
 * - CinematicExperience (desktop): pinned viewport, scroll-scrubbed
 *   card deck with camera-like momentum (Apple product-page style).
 * - MobileExperience (touch/small screens): purpose-built shorter
 *   story — no pinning, cards float in with elastic springs, touch
 *   tilt, tap rewards, sparkles + completion moment at the end.
 * - StaticExperience: prefers-reduced-motion fallback.
 */

/* Ambient backdrop states (identical structure so they interpolate). */
const AMBIENT = [
  "radial-gradient(60% 55% at 75% 18%, rgba(99, 102, 241, 0.20) 0%, rgba(99, 102, 241, 0) 70%)",
  "radial-gradient(60% 55% at 25% 55%, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0) 70%)",
  "radial-gradient(60% 55% at 70% 82%, rgba(167, 139, 250, 0.18) 0%, rgba(167, 139, 250, 0) 70%)",
];

const springy = { type: "spring", stiffness: 210, damping: 19 };

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Monogram({ job, className }) {
  const [spins, setSpins] = useState(0);

  return (
    <Motion.button
      type="button"
      aria-label={`${job.company} — tap for a spin`}
      onClick={() => setSpins((s) => s + 1)}
      whileTap={{ scale: 0.85 }}
      animate={{
        rotate: spins * 360,
        borderRadius: spins > 0 ? ["16px", "50%", "16px"] : "16px",
      }}
      transition={{ type: "spring", stiffness: 160, damping: 15 }}
      className={cn(
        "flex shrink-0 cursor-pointer items-center justify-center border border-line",
        "bg-accent-soft font-semibold text-accent",
        className
      )}
    >
      {job.company.charAt(0)}
    </Motion.button>
  );
}

function Sparkles({ count = 10 }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const distance = 56 + (i % 3) * 22;
        return (
          <Motion.span
            key={i}
            className="absolute left-1/2 top-8 h-1 w-1 rounded-full bg-accent"
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance * 0.7,
              scale: [0, 1.5, 0.3],
            }}
            transition={{ duration: 1.15, ease: "easeOut", delay: 0.15 + i * 0.03 }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: shorter, touch-native storytelling (no pinning)             */
/* ------------------------------------------------------------------ */

function MobileStoryCard({ job, index, isLast, lowPower, onActive, onComplete }) {
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 180, damping: 16 });
  const rotateY = useSpring(rawRY, { stiffness: 180, damping: 16 });
  const [celebrated, setCelebrated] = useState(false);

  // Gentle tilt following the finger (or mouse), ±4 degrees.
  const onPointerMove = (e) => {
    if (lowPower) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawRY.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    rawRX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
  };
  const resetTilt = () => {
    rawRX.set(0);
    rawRY.set(0);
  };

  const enter = () => {
    onActive(index);
    if (isLast && !celebrated) {
      setCelebrated(true);
      onComplete();
    }
  };

  return (
    <Motion.li
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: "spring", stiffness: 90, damping: 15, mass: 0.9 }}
      onViewportEnter={enter}
      className="relative"
      style={{ perspective: 900 }}
    >
      {/* Timeline dot, aligned with the card header */}
      <span aria-hidden className="absolute -left-[27px] top-7 flex h-4 w-4 items-center justify-center">
        <Motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={springy}
          className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]"
        />
      </span>

      <Motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        onPointerUp={resetTilt}
        whileTap={lowPower ? undefined : { scale: 0.985 }}
        className="rounded-2xl border border-line bg-surface/95 p-5 shadow-card will-change-transform"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {job.period}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-foreground">
              {job.role}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {job.company} · {job.location}
            </p>
          </div>
          <Monogram job={job} className="h-11 w-11 rounded-2xl text-sm" />
        </div>

        <ul className="mt-4 space-y-2">
          {job.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {job.stack.map((tech, i) => (
            <Motion.li
              key={tech}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...springy, delay: 0.15 + i * 0.05 }}
            >
              <Badge className="px-2.5 text-[11px]">{tech}</Badge>
            </Motion.li>
          ))}
        </ul>

        {celebrated && !lowPower && <Sparkles />}
      </Motion.div>
    </Motion.li>
  );
}

function MobileExperience({ lowPower }) {
  const sectionRef = useRef(null);
  const [, setActive] = useState(0);
  const [complete, setComplete] = useState(false);
  const tilt = useDeviceTilt(!lowPower);

  // Progress line fills as the story scrolls by (no pinning on mobile).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.85"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  // Ambient glow drifts slightly with device tilt where supported.
  const glowX = useTransform(tilt.x, [-1, 1], [-24, 24]);
  const glowY = useTransform(tilt.y, [-1, 1], [-16, 16]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-20"
    >
      <Motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="absolute -top-24 right-0 h-72 w-72 rounded-full opacity-70 blur-3xl"
      >
        <div className="h-full w-full" style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }} />
      </Motion.div>

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Six years, one throughline: ownership"
          description="From my first production Drupal site to leading enterprise architecture."
        />

        <div className="relative mt-12 pl-7">
          {/* Rail + animated fill */}
          <div aria-hidden className="absolute bottom-2 left-[6px] top-2 w-px bg-line" />
          <Motion.div
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[6px] top-2 w-px origin-top bg-accent"
          />

          <ol className="space-y-8">
            {experience.map((job, i) => (
              <MobileStoryCard
                key={job.role + job.period}
                job={job}
                index={i}
                isLast={i === experience.length - 1}
                lowPower={lowPower}
                onActive={setActive}
                onComplete={() => setComplete(true)}
              />
            ))}
          </ol>

          {/* Completion moment */}
          <Motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={complete ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springy, delay: 0.5 }}
            className="mt-10 pl-1 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
          >
            ✦ That's the story so far — still writing it.
          </Motion.p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: pinned cinematic deck                                      */
/* ------------------------------------------------------------------ */

function StoryCard({ progress, index, count, job, isActive, lowPower }) {
  const s = 1 / count;
  const last = index === count - 1;

  const enter = [(index - 0.6) * s, (index - 0.08) * s];
  const exit = [(index + 0.5) * s, (index + 1.05) * s];
  const range = [...enter, ...exit];

  const y = useTransform(progress, range, ["58vh", "0vh", "0vh", last ? "0vh" : "-9vh"]);
  const scale = useTransform(progress, range, [0.92, 1, 1, last ? 1 : 0.9]);
  const opacity = useTransform(progress, range, [0, 1, 1, last ? 1 : 0.28]);
  const filter = useTransform(progress, range, [
    "blur(10px)",
    "blur(0px)",
    "blur(0px)",
    last ? "blur(0px)" : "blur(5px)",
  ]);
  const rotateX = useTransform(progress, enter, [10, 0]);

  const stagger = (delay) => [enter[0] + delay * s, enter[1] + delay * s];
  const pointsOpacity = useTransform(progress, stagger(0.12), [0, 1]);
  const pointsY = useTransform(progress, stagger(0.12), [44, 0]);
  const metaOpacity = useTransform(progress, stagger(0.22), [0, 1]);
  const metaY = useTransform(progress, stagger(0.22), [32, 0]);

  return (
    <Motion.article
      style={{
        y,
        scale,
        opacity,
        rotateX,
        zIndex: index,
        ...(lowPower ? {} : { filter }),
      }}
      className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-2xl -translate-y-1/2 will-change-transform"
    >
      {/* The active card gently breathes */}
      <Motion.div
        animate={isActive && !lowPower ? { scale: [1, 1.006, 1] } : { scale: 1 }}
        transition={
          isActive && !lowPower
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className={cn(
          "group rounded-3xl border border-line bg-surface/90 p-6 shadow-card backdrop-blur-md sm:p-9",
          "transition-shadow duration-300 hover:shadow-card-hover"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {job.period}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {job.role}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-muted">
              {job.company} · {job.location}
            </p>
          </div>
          <Monogram job={job} className="h-12 w-12 rounded-2xl sm:h-14 sm:w-14" />
        </div>

        <Motion.ul
          style={{ opacity: pointsOpacity, y: pointsY }}
          className="mt-6 space-y-2.5"
        >
          {job.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </Motion.ul>

        <Motion.ul
          style={{ opacity: metaOpacity, y: metaY }}
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {job.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </Motion.ul>
      </Motion.div>
    </Motion.article>
  );
}

function Rail({ progress, active, count, onJump }) {
  const fill = useTransform(progress, [0.25 / count, (count - 0.75) / count], [0, 1]);

  return (
    <div className="relative hidden h-[52vh] w-40 shrink-0 md:block">
      <div className="absolute left-[7px] top-0 h-full w-px bg-line" aria-hidden />
      <Motion.div
        aria-hidden
        style={{ scaleY: fill }}
        className="absolute left-[7px] top-0 h-full w-px origin-top bg-accent"
      />

      {experience.map((job, i) => (
        <button
          key={job.period}
          type="button"
          onClick={() => onJump(i)}
          aria-label={`Jump to ${job.role}, ${job.period}`}
          aria-current={active === i ? "step" : undefined}
          className="group absolute flex -translate-y-1/2 items-center gap-4"
          style={{ top: `${count > 1 ? (i / (count - 1)) * 100 : 0}%` }}
        >
          <Motion.span
            aria-hidden
            animate={
              active === i
                ? { scale: [1, 1.45, 1.1], boxShadow: "0 0 18px var(--glow)" }
                : { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" }
            }
            transition={springy}
            className={cn(
              "h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500",
              active === i
                ? "border-accent bg-accent"
                : i < active
                  ? "border-accent bg-accent/40"
                  : "border-line-strong bg-surface group-hover:border-accent/60"
            )}
          />
          <span
            className={cn(
              "whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-500",
              active === i ? "text-foreground" : "text-subtle group-hover:text-muted"
            )}
          >
            {job.period}
          </span>
        </button>
      ))}
    </div>
  );
}

function CinematicExperience({ lowPower }) {
  const sectionRef = useRef(null);
  const count = experience.length;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round(v * count - 0.25))));
  });

  const ambient = useTransform(progress, [0, 0.5, 1], AMBIENT);
  const hintOpacity = useTransform(progress, [0.82, 0.95], [1, 0]);

  const jumpTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrub = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + ((i + 0.3) / count) * scrub,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative border-t border-line"
      style={{ height: `${(count + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <Motion.div aria-hidden className="absolute inset-0" style={{ background: ambient }} />
        <div aria-hidden className="absolute inset-0 grid-fade opacity-40" />

        <div className="relative mx-auto flex w-full max-w-6xl items-end justify-between px-4 pt-24 sm:px-6 lg:px-8">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Experience
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-[clamp(1.5rem,1rem+2.4vw,2.25rem)] font-semibold tracking-tight text-foreground"
            >
              Six years, one throughline: ownership
            </h2>
          </div>
          <p className="hidden shrink-0 font-mono text-sm text-subtle sm:block" aria-live="polite">
            <span className="text-foreground">0{active + 1}</span> / 0{count}
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center gap-10 px-4 sm:px-6 lg:px-8">
          <Rail progress={progress} active={active} count={count} onJump={jumpTo} />
          <div className="relative h-[62vh] min-w-0 flex-1" style={{ perspective: 1200 }}>
            {experience.map((job, i) => (
              <StoryCard
                key={job.role + job.period}
                progress={progress}
                index={i}
                count={count}
                job={job}
                isActive={active === i}
                lowPower={lowPower}
              />
            ))}
          </div>
        </div>

        <Motion.p
          aria-hidden
          style={{ opacity: hintOpacity }}
          className="relative pb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
        >
          Keep scrolling
        </Motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Static fallback for prefers-reduced-motion                          */
/* ------------------------------------------------------------------ */

function StaticExperience() {
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
            {experience.map((job) => (
              <li key={job.role + job.period} className="relative pl-10 sm:pl-14">
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-accent-soft"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {job.role}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-subtle">
                    {job.period}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {job.company} ·{" "}
                  <span className="font-normal text-muted">{job.location}</span>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const { isMobile, lowPower } = useDeviceProfile();

  if (reduceMotion) return <StaticExperience />;
  if (isMobile) return <MobileExperience lowPower={lowPower} />;
  return <CinematicExperience lowPower={lowPower} />;
}
