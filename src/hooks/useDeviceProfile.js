import { useEffect, useState } from "react";

function readProfile() {
  if (typeof window === "undefined") {
    return { isMobile: false, isCoarse: false, lowPower: false, tier: "high" };
  }
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  // Heuristic tier detection: few cores, little memory, or data-saver on.
  const lowPower =
    (navigator.hardwareConcurrency ?? 8) <= 4 ||
    (navigator.deviceMemory ?? 8) <= 2 ||
    navigator.connection?.saveData === true;

  // Fidelity tier: "high" (full cinematic), "balanced" (mobile — lighter
  // but polished), "lite" (low-powered — no blur/particles/3D extras).
  const tier = lowPower ? "lite" : isMobile ? "balanced" : "high";
  return { isMobile, isCoarse, lowPower, tier };
}

/**
 * Device capability profile used to pick layout variants and scale
 * animation complexity down on lower-powered hardware.
 */
export function useDeviceProfile() {
  const [profile, setProfile] = useState(readProfile);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setProfile(readProfile());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return profile;
}
