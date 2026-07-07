import { lazy, Suspense, useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, FileDown, MapPin } from "lucide-react";
import { profile } from "../../data/portfolio";
import { useDeviceProfile } from "../../hooks/useDeviceProfile";
import Button from "../ui/Button";
import Magnetic from "../ui/Magnetic";
import SocialLinks from "../ui/SocialLinks";

const ParticleField = lazy(() => import("../three/ParticleField"));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero({ theme }) {
  const reduceMotion = useReducedMotion();
  const { lowPower, tier } = useDeviceProfile();
  const [showThree, setShowThree] = useState(false);

  // Defer the Three.js bundle until the browser is idle so it never
  // competes with first paint. Skipped entirely on low-powered devices,
  // where the CSS glow layers carry the look on their own.
  useEffect(() => {
    if (reduceMotion || lowPower) return;
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1200));
    const id = idle(() => setShowThree(true));
    return () =>
      (window.cancelIdleCallback ?? clearTimeout)(id);
  }, [reduceMotion, lowPower]);

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-16"
    >
      {/* Layered background: grid + particles + glow */}
      <div aria-hidden className="absolute inset-0 grid-fade" />
      {showThree && (
        <Suspense fallback={null}>
          <ParticleField theme={theme} count={tier === "high" ? 900 : 450} />
        </Suspense>
      )}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <Motion.div
          variants={container}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? false : "show"}
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <Motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {profile.availability}
            </span>
          </Motion.div>

          <Motion.h1
            variants={item}
            className="mt-8 text-[clamp(2.375rem,1rem+6vw,4.5rem)] font-semibold leading-[1.06] tracking-tight text-balance"
          >
            <span className="text-gradient">{profile.headline}</span>
          </Motion.h1>

          <Motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.subheadline}
          </Motion.p>

          <Motion.p
            variants={item}
            className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-subtle"
          >
            <MapPin size={13} aria-hidden />
            {profile.location}
          </Motion.p>

          <Motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button as="a" href="#work" variant="primary" size="lg">
                View case studies
                <ArrowRight size={17} aria-hidden />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button as="a" href="#contact" variant="outline" size="lg">
                Get in touch
              </Button>
            </Magnetic>
            <Magnetic className="lg:hidden">
              <Button
                as="a"
                href={profile.resumeUrl}
                download="Yash-Bharadwaj-Resume.pdf"
                variant="ghost"
                size="lg"
              >
                <FileDown size={17} aria-hidden />
                Résumé
              </Button>
            </Magnetic>
          </Motion.div>

          <Motion.div variants={item} className="mt-9">
            <SocialLinks />
          </Motion.div>
        </Motion.div>

        {/* Portrait — renders profile.photo when provided, monogram card otherwise */}
        <Motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="hidden justify-self-center lg:block"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] opacity-70 blur-2xl"
              style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
            />
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={288}
                height={352}
                className="relative h-88 w-72 rounded-3xl border border-line object-cover shadow-card"
              />
            ) : (
              /* Monogram card doubles as the résumé download */
              <a
                href={profile.resumeUrl}
                download="Yash-Bharadwaj-Resume.pdf"
                aria-label="Download résumé (PDF)"
                className="group relative flex h-88 w-72 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
              >
                <div className="font-mono text-xs text-subtle">
                  ~/{profile.name.toLowerCase().replace(" ", "-")}
                </div>
                <p
                  aria-hidden
                  className="text-gradient text-center text-7xl font-semibold tracking-tight"
                >
                  YB
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{profile.role}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    <FileDown size={13} aria-hidden />
                    resume.pdf
                  </span>
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 100% 0%, var(--glow), transparent 55%)",
                  }}
                />
              </a>
            )}
          </div>
        </Motion.div>
      </div>

      {/* Scroll hint */}
      <a
        href="#metrics"
        aria-label="Scroll to highlights"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-subtle transition-colors hover:text-foreground sm:block"
      >
        <ArrowDown size={18} className={reduceMotion ? "" : "animate-bounce"} aria-hidden />
      </a>
    </section>
  );
}
