import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/shared/Icons";
import { Section } from "@/components/shared/Section";
import { PROJECTS } from "@/lib/constants";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal={`cat /systems/${project.slug}/README.md`}>
        <Link
          href="/systems"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={14} />
          Back to Systems
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 font-mono text-xs text-[var(--accent-glow)]">
            {project.tier === "flagship" ? "Flagship" : "Public Project"}
          </span>
          <span className="text-xs text-[var(--text-muted)]">{project.status}</span>
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--text-primary)] md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-2 text-lg text-[var(--text-muted)]">{project.tagline}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] px-3 py-1 font-mono text-sm text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent-glow)] hover:text-[var(--accent-primary)]"
          >
            <GithubIcon size={16} />
            View on GitHub
          </a>
        )}

        {/* Highlights */}
        <div className="mt-12">
          <h2 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-[var(--accent-primary)]">
            Key Highlights
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.highlights.map((h) => (
              <div
                key={h}
                className="glass rounded-[var(--radius-md)] p-4"
              >
                <p className="text-sm text-[var(--text-secondary)]">{h}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for MDX content */}
        <div className="mt-16 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] p-8 text-center">
          <p className="font-mono text-sm text-[var(--text-muted)]">
            Full MDX case study content will be loaded here.
          </p>
        </div>
      </Section>
    </div>
  );
}
