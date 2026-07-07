import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { profile } from "../../data/portfolio";
import { cn } from "../../lib/utils";

const icons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
};

export default function SocialLinks({ className, itemClassName }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {profile.social.map((s) => {
        const Icon = icons[s.icon];
        const external = s.href.startsWith("http");
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full",
                "border border-line text-muted transition-colors duration-200",
                "hover:border-line-strong hover:text-foreground",
                itemClassName
              )}
            >
              <Icon size={17} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
