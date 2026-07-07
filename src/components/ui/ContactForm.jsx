import { useState } from "react";
import { Check, Loader2, Send, TriangleAlert } from "lucide-react";
import { profile } from "../../data/portfolio";
import Button from "./Button";
import { cn } from "../../lib/utils";

/**
 * Contact form backed by Web3Forms (free, serverless-friendly).
 * Setup: get an access key at https://web3forms.com (email in → key out),
 * then put it in .env as VITE_WEB3FORMS_KEY and rebuild.
 *
 * Until a key is configured the form falls back to composing a mailto:
 * draft from the filled-in fields, so it always does something useful.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const inputClasses = cn(
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-foreground",
  "placeholder:text-subtle transition-colors duration-200",
  "hover:border-line-strong focus:border-accent focus:outline-none",
  "focus-visible:outline-2 focus-visible:outline-accent"
);

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    // Honeypot: bots fill every field; humans never see this one.
    if (data.website) return;

    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio inquiry from ${data.name}`,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-surface p-8 text-center shadow-card"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-soft">
          <Check size={22} className="text-success" aria-hidden />
        </span>
        <p className="mt-4 font-semibold text-foreground">Message sent.</p>
        <p className="mt-1 text-sm text-muted">
          Thanks for reaching out — I'll reply within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="text-left" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          minLength={20}
          placeholder="Tell me about the role or project — team, stack, timeline…"
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      {/* Honeypot (hidden from humans and screen readers) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Button type="submit" variant="accent" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send size={17} aria-hidden />
              Send message
            </>
          )}
        </Button>

        {status === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm text-muted">
            <TriangleAlert size={15} className="text-amber-500" aria-hidden />
            Something went wrong — email me directly at{" "}
            <a href={`mailto:${profile.email}`} className="font-medium text-accent underline">
              {profile.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
