import { cn } from "../../lib/utils";

export default function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line",
        "bg-surface px-3 py-1 text-xs font-medium text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
