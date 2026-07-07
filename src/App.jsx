import { useMemo } from "react";
import { useTheme } from "./hooks/useTheme";
import { useActiveSection } from "./hooks/useActiveSection";
import { navSections } from "./data/portfolio";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Metrics from "./components/sections/Metrics";
import CaseStudies from "./components/sections/CaseStudies";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Philosophy from "./components/sections/Philosophy";
import Writing from "./components/sections/Writing";
import OpenSource from "./components/sections/OpenSource";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const sectionIds = useMemo(() => navSections.map((s) => s.id), []);
  const active = useActiveSection(sectionIds);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar active={active} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero theme={theme} />
        <Metrics />
        <CaseStudies />
        <Experience />
        <Skills />
        <Philosophy />
        <Writing />
        <OpenSource />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
