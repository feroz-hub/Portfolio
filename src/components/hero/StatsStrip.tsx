"use client";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { CountUp } from "@/components/reactbits/CountUp";

interface Stat {
  readonly value: string;
  readonly label: string;
}

interface StatsStripProps {
  stats: readonly Stat[];
}

function parseStatValue(value: string): {
  numeric: number;
  suffix: string;
} | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { numeric: parseInt(match[1], 10), suffix: match[2] };
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-2 gap-px px-[var(--page-pad)] py-8 md:grid-cols-4">
        {stats.map((stat, i) => {
          const parsed = parseStatValue(stat.value);

          return (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-1 py-4 text-center">
                <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--text-primary)] md:text-4xl">
                  {parsed ? (
                    <CountUp
                      from={0}
                      to={parsed.numeric}
                      suffix={parsed.suffix}
                      duration={1.5}
                      separator=","
                    />
                  ) : (
                    stat.value
                  )}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
