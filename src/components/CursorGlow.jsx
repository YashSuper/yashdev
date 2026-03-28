import { useEffect } from "react";

const CursorGlow = () => {
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-glow" />;
};

export default CursorGlow;
