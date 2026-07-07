import { metrics } from "../../data/portfolio";
import Reveal from "../ui/Reveal";

export default function Metrics() {
  return (
    <section id="metrics" aria-label="Career highlights" className="border-y border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 divide-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {metrics.map((m, i) => (
            <Reveal
              key={m.label}
              delay={i * 0.06}
              y={16}
              className="flex flex-col px-2 py-8 text-center sm:py-10 lg:px-6"
            >
              <dt className="order-2 mt-2 text-sm font-medium text-muted">
                {m.label}
              </dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {m.value}
              </dd>
              <dd className="order-3 mt-1 text-xs text-subtle">{m.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
