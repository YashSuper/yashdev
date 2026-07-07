import { useState } from "react";
import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-foreground text-background hover:opacity-85 shadow-card",
  accent:
    "bg-accent text-accent-foreground hover:opacity-90 shadow-card",
  outline:
    "border border-line-strong bg-transparent text-foreground hover:bg-accent-soft hover:border-accent/50",
  ghost: "text-muted hover:text-foreground hover:bg-accent-soft",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  onPointerDown,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now() + Math.random();
    setRipples((r) => [
      ...r,
      { id, size, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2 },
    ]);
    setTimeout(() => {
      setRipples((r) => r.filter((ripple) => ripple.id !== id));
    }, 650);
    onPointerDown?.(e);
  };

  return (
    <Comp
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium",
        "transition-all duration-200 active:scale-[0.97] select-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      onPointerDown={addRipple}
      {...props}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className="ripple pointer-events-none absolute rounded-full bg-current"
          style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
        />
      ))}
    </Comp>
  );
}
