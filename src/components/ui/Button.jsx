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
  ...props
}) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "transition-all duration-200 active:scale-[0.98] select-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
