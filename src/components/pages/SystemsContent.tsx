"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/Icons";
import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { PROJECTS, PROJECT_TIERS } from "@/lib/constants";

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Active" },
    shipped: { bg: "bg-cyan-500/20", text: "text-cyan-400", label: "Shipped" },
    scaffolded: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Scaffold" },
    learning: { bg: "bg-zinc-500/20", text: "text-zinc-400", label: "Learning" },
  };
  const c = config[status] ?? config.shipped;
  return (
    <span className={`${c.bg} ${c.text} rounded px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider`}>
      {c.label}
    </span>
  );
}

export function SystemsContent() {
  const tiers = ["flagship", "public", "learning"] as const;

  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="ls /systems --all">
        {/* Header */}
        <ScrollReveal>
          <ShinyText
            text="All Systems"
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            color="#7c3aed"
            shineColor="#a78bfa"
            speed={4}
          />
        </ScrollReveal>

        <div className="mb-12 max-w-2xl">
          <BlurText
            text="Products, platforms, and engineering explorations."
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            delay={60}
            animateBy="words"
            direction="bottom"
            stepDuration={0.4}
          />
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
              Organized by scope — from flagship SaaS infrastructure to open-source
              projects and structured learning paths.
            </p>
          </ScrollReveal>
        </div>

        {tiers.map((tier) => {
          const tierProjects = PROJECTS.filter((p) => p.tier === tier);
          if (tierProjects.length === 0) return null;
          const tierInfo = PROJECT_TIERS[tier];

          return (
            <div key={tier} className="mb-16">
              <ScrollReveal>
                <div className="mb-6 flex items-center gap-3">
                  <ShinyText
                    text={tierInfo.label}
                    className="font-mono text-xs font-medium uppercase tracking-widest"
                    color="#7c3aed"
                    shineColor="#a78bfa"
                    speed={3}
                  />
                  <span className="h-px flex-1 bg-[var(--border)]" />
                </div>
              </ScrollReveal>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {tierProjects.map((project, i) => (
                  <ScrollReveal key={project.slug} delay={i * 0.08}>
                    <SpotlightCard
                      className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] p-5"
                      spotlightColor="rgba(124, 58, 237, 0.1)"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-[var(--text-primary)]">
                          {project.title}
                        </h4>
                        <StatusBadge status={project.status} />
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">
                        {project.tagline}
                      </p>
                      <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 border-t border-[var(--border)] pt-3">
                        {project.caseStudy && (
                          <Link
                            href={`/systems/${project.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-[var(--accent-glow)] hover:text-[var(--accent-primary)]"
                          >
                            Case Study <ArrowUpRight size={13} />
                          </Link>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          >
                            <GithubIcon size={13} /> Source
                          </a>
                        )}
                      </div>
                    </SpotlightCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </Section>
    </div>
  );
}
