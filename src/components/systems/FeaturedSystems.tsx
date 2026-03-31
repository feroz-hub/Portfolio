"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/shared/Icons";
import { GlowCard } from "@/components/shared/GlowCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { PROJECTS } from "@/lib/constants";

const FEATURED_SLUGS = ["rentflow", "zentra", "eventra", "congocart"];

export function FeaturedSystems() {
  const featured = PROJECTS.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {featured.map((project, i) => (
        <ScrollReveal key={project.slug} delay={i * 0.1}>
          <GlowCard className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 font-mono text-xs text-[var(--accent-glow)]">
                {project.tier === "flagship" ? "Flagship" : "Public"}
              </span>
              <StatusBadge status={project.status} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {project.tagline}
              </p>
            </div>

            <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-[var(--border)] pt-4">
              {project.caseStudy && (
                <Link
                  href={`/systems/${project.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-[var(--accent-glow)] transition-colors hover:text-[var(--accent-primary)]"
                >
                  Case Study
                  <ArrowUpRight size={14} />
                </Link>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <GithubIcon size={14} />
                  Source
                </a>
              )}
            </div>
          </GlowCard>
        </ScrollReveal>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string }> = {
    active: { label: "Active", color: "text-emerald-400 bg-emerald-500/10" },
    shipped: { label: "Shipped", color: "text-cyan-400 bg-cyan-500/10" },
    scaffolded: { label: "Scaffolded", color: "text-yellow-400 bg-yellow-500/10" },
    learning: { label: "Resource", color: "text-[var(--text-muted)] bg-[var(--glass)]" },
  };
  const c = config[status] ?? config.shipped;
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.color}`}>
      {c.label}
    </span>
  );
}
