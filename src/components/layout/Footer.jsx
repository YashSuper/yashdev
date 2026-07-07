import { profile, navSections } from "../../data/portfolio";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold tracking-tight text-foreground">
              yash<span className="text-accent">.dev</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navSections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks />
        </div>

        <p className="mt-10 text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Designed and built from
          scratch — no templates.
        </p>
      </div>
    </footer>
  );
}
