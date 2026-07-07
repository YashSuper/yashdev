import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";

export default function ThemeToggle({ theme, onToggle, className }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full",
        "border border-line text-muted transition-colors duration-200",
        "hover:border-line-strong hover:text-foreground cursor-pointer",
        className
      )}
    >
      {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}
