import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view for nav highlighting.
 * Uses a rootMargin band around the viewport center so exactly one
 * section is "active" at a time.
 *
 * Sections are code-split and mount lazily, so this hook re-scans the
 * DOM whenever a DeferredSection announces itself via the
 * "section-mounted" event.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    const observed = new Set();
    const observeAll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      }
    };

    observeAll();
    window.addEventListener("section-mounted", observeAll);

    return () => {
      observer.disconnect();
      window.removeEventListener("section-mounted", observeAll);
    };
  }, [ids]);

  return active;
}
