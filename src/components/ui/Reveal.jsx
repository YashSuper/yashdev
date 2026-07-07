import { motion as Motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal. Animates once, subtly, and respects
 * prefers-reduced-motion (falls back to a plain div).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Comp = Motion[as] ?? Motion.div;

  if (reduceMotion) {
    const Plain = as;
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
