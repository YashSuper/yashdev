import { useRef } from "react";
import { motion as Motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic hover effect: the child drifts gently toward a mouse cursor
 * and springs back on leave. Inert for touch input, where there is no
 * hover to be magnetic toward.
 */
export default function Magnetic({ children, strength = 0.22, className }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 17, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 17, mass: 0.5 });

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength);
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <Motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={className}
    >
      {children}
    </Motion.div>
  );
}
