import { useState } from "react";
import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { profile } from "../../data/portfolio";
import Button from "../ui/Button";
import ContactForm from "../ui/ContactForm";
import SocialLinks from "../ui/SocialLinks";
import Reveal from "../ui/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
        />

        <Reveal className="relative mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl text-balance"
          >
            Let's build something that lasts.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I'm currently {profile.availability.toLowerCase()} — full-time,
            contract, or consulting. If you're hiring for senior frontend or
            need an architecture partner, my inbox is open.
          </p>

          <div className="mt-10">
            <ContactForm />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href={`mailto:${profile.email}`} variant="outline" size="md">
              <Mail size={16} aria-hidden />
              {profile.email}
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-success" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden />
                  Copy email
                </>
              )}
            </Button>
          </div>

          <p className="mt-6 text-sm text-subtle">
            Typically replies within 24 hours · {profile.location}
          </p>

          <div className="mt-9 flex justify-center">
            <SocialLinks />
          </div>

          <a
            href={profile.resumeUrl}
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Download résumé
            <ArrowRight size={15} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
