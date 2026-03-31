"use client";

import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { CountUp } from "@/components/reactbits/CountUp";
import { EXPERIENCES } from "@/lib/constants";

const CAREER_STATS = [
  { value: 4, suffix: "+", label: "Years in Production" },
  { value: 6, suffix: "", label: "Companies" },
  { value: 2, suffix: "", label: "Founded" },
  { value: 64, suffix: "+", label: "Repositories" },
];

export function ExperienceContent() {
  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="cat /experience --timeline">
        {/* Header */}
        <ScrollReveal>
          <ShinyText
            text="Timeline"
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            color="#7c3aed"
            shineColor="#a78bfa"
            speed={4}
          />
        </ScrollReveal>

        <div className="mb-12 max-w-2xl">
          <BlurText
            text="From platform hardening to founder-led product architecture."
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            delay={60}
            animateBy="words"
            direction="bottom"
            stepDuration={0.4}
          />
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
              My background spans security, delivery engineering, and product-oriented
              backend builds. That mix informs architecture decisions that are both
              practical and protective.
            </p>
          </ScrollReveal>
        </div>

        {/* Career Stats Strip */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {CAREER_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                <span className="font-[family-name:var(--font-display)] text-3xl text-[var(--text-primary)] md:text-4xl">
                  <CountUp
                    from={0}
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <article
                key={`${exp.company}-${exp.role}`}
                className={`relative grid gap-6 md:grid-cols-2 ${
                  i % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)] md:left-1/2" />

                {/* Date side */}
                <ScrollReveal
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                >
                  <div
                    className={`pl-10 md:pl-0 ${
                      i % 2 === 0 ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"
                    }`}
                  >
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {exp.period}
                    </span>
                  </div>
                </ScrollReveal>

                {/* Content side */}
                <ScrollReveal
                  direction={i % 2 === 0 ? "right" : "left"}
                  delay={i * 0.1 + 0.05}
                >
                  <div
                    className={`ml-10 md:ml-0 ${
                      i % 2 === 0 ? "md:ml-12" : "md:order-1 md:mr-12"
                    }`}
                  >
                    <SpotlightCard
                      className="rounded-[var(--radius-lg)] p-5"
                      spotlightColor="rgba(124, 58, 237, 0.08)"
                    >
                      <DecryptedText
                        text={exp.company}
                        className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)]"
                        animateOn="view"
                        speed={50}
                        sequential
                        revealDirection="start"
                      />
                      <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-sm leading-relaxed text-[var(--text-secondary)]"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 font-mono text-xs text-[var(--text-muted)]">
                        {exp.stack}
                      </p>
                    </SpotlightCard>
                  </div>
                </ScrollReveal>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
