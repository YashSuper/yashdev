import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Normalized (-1..1) device tilt as spring-smoothed motion values.
 * Listens only where DeviceOrientation works without a permission
 * prompt (Android / desktop); on iOS 13+ the API requires a modal
 * permission request, so we silently skip — the UI it drives is a
 * pure enhancement and looks fine static.
 */
export function useDeviceTilt(enabled = true) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 55, damping: 18 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18 });

  useEffect(() => {
    if (!enabled || typeof window.DeviceOrientationEvent === "undefined") return;
    if (typeof window.DeviceOrientationEvent.requestPermission === "function") return;

    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const onOrientation = (e) => {
      if (e.gamma == null || e.beta == null) return;
      rawX.set(clamp(e.gamma / 30)); // left/right tilt
      rawY.set(clamp((e.beta - 45) / 30)); // toward/away, 45° = neutral hold
    };

    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [enabled, rawX, rawY]);

  return { x, y };
}
