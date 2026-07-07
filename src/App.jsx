import { lazy, useEffect } from "react";
import { useTheme } from "./hooks/useTheme";
import { useDeviceProfile } from "./hooks/useDeviceProfile";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ResumeFab from "./components/layout/ResumeFab";
import DeferredSection from "./components/layout/DeferredSection";
import Hero from "./components/sections/Hero";
import Metrics from "./components/sections/Metrics";

/*
 * Above-the-fold (Hero, Metrics, chrome) ships in the initial bundle.
 * Everything else is split into per-section chunks, mounted as the
 * user approaches them, and prefetched in order during idle time so
 * scrolling never waits on the network.
 */
const sectionLoaders = [
  () => import("./components/sections/CaseStudies"),
  () => import("./components/sections/Experience"),
  () => import("./components/sections/Skills"),
  () => import("./components/sections/Philosophy"),
  () => import("./components/sections/Writing"),
  () => import("./components/sections/OpenSource"),
  () => import("./components/sections/Testimonials"),
  () => import("./components/sections/Contact"),
];

const CaseStudies = lazy(sectionLoaders[0]);
const Experience = lazy(sectionLoaders[1]);
const Skills = lazy(sectionLoaders[2]);
const Philosophy = lazy(sectionLoaders[3]);
const Writing = lazy(sectionLoaders[4]);
const OpenSource = lazy(sectionLoaders[5]);
const Testimonials = lazy(sectionLoaders[6]);
const Contact = lazy(sectionLoaders[7]);

function useIdlePrefetch(loaders) {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    let cancelled = false;
    let handle;

    const queue = [...loaders];
    const next = () => {
      if (cancelled || queue.length === 0) return;
      queue
        .shift()()
        .catch(() => {}) // prefetch failures are harmless; IO mount retries
        .finally(() => {
          if (!cancelled) handle = idle(next);
        });
    };
    handle = idle(next);

    return () => {
      cancelled = true;
      cancel(handle);
    };
  }, [loaders]);
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { isMobile, lowPower } = useDeviceProfile();

  useIdlePrefetch(sectionLoaders);

  // Global performance tier hook for CSS: strips blur/shadow layers
  // on low-powered devices (see index.css).
  useEffect(() => {
    document.documentElement.classList.toggle("perf-lite", lowPower);
  }, [lowPower]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero theme={theme} />
        <Metrics />
        <DeferredSection id="work" component={CaseStudies} minHeight="1900px" />
        <DeferredSection
          id="experience"
          component={Experience}
          minHeight={isMobile ? "1700px" : "400vh"}
        />
        <DeferredSection id="skills" component={Skills} minHeight="900px" />
        <DeferredSection id="philosophy" component={Philosophy} minHeight="800px" />
        <DeferredSection id="writing" component={Writing} minHeight="700px" />
        <DeferredSection id="open-source" component={OpenSource} minHeight="700px" />
        <DeferredSection id="testimonials" component={Testimonials} minHeight="700px" />
        <DeferredSection id="contact" component={Contact} minHeight="600px" />
      </main>

      <Footer />

      <ResumeFab />
    </>
  );
}
