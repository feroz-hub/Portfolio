import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/shared/Section";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Architecture deep-dives, technical decision records, and structured learning roadmaps by Feroze Basha.",
};

const RESOURCES = [
  {
    type: "Roadmap",
    title: "SQL Master Roadmap",
    description: "Practical progression for stronger database thinking and query discipline.",
    href: "https://github.com/feroz-hub/sql-master-roadmap",
  },
  {
    type: "Roadmap",
    title: "C# Master Roadmap",
    description: "A structured path for improving language fluency and production readiness.",
    href: "https://github.com/feroz-hub/c_sharp-master-roadmap",
  },
  {
    type: "Best Practices",
    title: "SOLID Principles in C#",
    description: "Readable examples of design principles applied to real backend code.",
    href: "https://github.com/feroz-hub/solid-principles-real-world-csharp",
  },
  {
    type: "Guide",
    title: ".NET + React Mastery",
    description: "Full-stack learning notes with backend-heavy engineering discipline.",
    href: "https://github.com/feroz-hub/dotnet-react-fullstack-mastery",
  },
  {
    type: "Roadmap",
    title: "LINQ Master Roadmap",
    description: "A focused path for writing cleaner, more expressive data access logic.",
    href: "https://github.com/feroz-hub/linq-master-roadmap",
  },
];

export default function WritingPage() {
  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="ls /writing">
        <SectionHeader
          eyebrow="Writing & Resources"
          title="Learning systems I maintain in public."
          description="Guides, roadmaps, and technical writing that sharpen fundamentals and document the thinking I bring to real projects."
        />

        {/* Blog posts placeholder */}
        <div className="mb-16">
          <h3 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-[var(--accent-primary)]">
            Articles (coming soon)
          </h3>
          <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] p-8 text-center">
            <p className="font-mono text-sm text-[var(--text-muted)]">
              Architecture deep-dives and technical decision records — publishing soon.
            </p>
          </div>
        </div>

        {/* Resources grid */}
        <h3 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-[var(--accent-primary)]">
          Public Resources & Roadmaps
        </h3>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="glass group flex flex-col gap-3 rounded-[var(--radius-lg)] p-5 transition-colors hover:border-[var(--border-strong)]"
            >
              <span className="font-mono text-xs text-[var(--accent-glow)]">
                {resource.type}
              </span>
              <h4 className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                {resource.title}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </h4>
              <p className="text-sm text-[var(--text-secondary)]">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
