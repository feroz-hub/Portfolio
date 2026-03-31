import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  terminal?: string;
}

export function Section({ id, children, className, terminal }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-[var(--section-gap)]", className)}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--page-pad)]">
        {terminal && (
          <p className="terminal-prompt mb-8 font-mono text-sm text-[var(--text-muted)]">
            {terminal}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--accent-primary)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
