import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FileDown } from "lucide-react";
import { profile } from "../../data/portfolio";

/**
 * Floating résumé download button. Hidden during the hero (the YB card
 * and mobile CTA cover résumé there), then springs in once the visitor
 * starts scrolling.
 */
export default function ResumeFab() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Motion.a
          href={profile.resumeUrl}
          download="Yash-Bharadwaj-Resume.pdf"
          aria-label="Download résumé (PDF)"
          title="Download résumé"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-accent text-accent-foreground shadow-card-hover transition-[padding] duration-300 hover:pr-4 sm:bottom-6 sm:right-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            <FileDown size={20} aria-hidden />
          </span>
          <span
            aria-hidden
            className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[5rem] group-hover:opacity-100 group-focus-visible:max-w-[5rem] group-focus-visible:opacity-100 max-sm:hidden"
          >
            Résumé
          </span>
        </Motion.a>
      )}
    </AnimatePresence>
  );
}
