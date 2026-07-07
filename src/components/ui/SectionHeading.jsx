import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <Reveal className="max-w-2xl">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="text-[clamp(1.75rem,1.2rem+2.4vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-foreground text-balance"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
