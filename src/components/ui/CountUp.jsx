import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a stat up from zero the first time it scrolls into view.
 * Handles values like "6+", "10k+", "58%"; non-numeric values render
 * as-is. Reduced motion renders the final value immediately.
 */
export default function CountUp({ value, className }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const animatable = target != null && !reduceMotion;
  const [display, setDisplay] = useState(animatable ? `0${suffix}` : value);

  useEffect(() => {
    if (!inView || !animatable) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, animatable, target, suffix]);

  return (
    <span ref={ref} className={className}>
      {animatable ? display : value}
    </span>
  );
}
