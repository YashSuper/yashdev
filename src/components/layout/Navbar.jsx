import { useEffect, useState } from "react";
import { motion as Motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navSections, profile } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";

const SECTION_IDS = navSections.map((s) => s.id);

export default function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Scroll progress indicator */}
      <Motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
      />

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          className="font-semibold tracking-tight text-foreground"
          aria-label={`${profile.name} — back to top`}
        >
          yash<span className="text-accent">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                  active === s.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {active === s.id && (
                  <Motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Button
            as="a"
            href="#contact"
            size="sm"
            variant="primary"
            className="hidden md:inline-flex"
          >
            Get in touch
          </Button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <ul className="space-y-1 px-4 py-4">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active === s.id
                      ? "bg-accent-soft text-foreground"
                      : "text-muted hover:bg-accent-soft hover:text-foreground"
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button as="a" href="#contact" size="sm" className="w-full" onClick={() => setOpen(false)}>
                Get in touch
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
