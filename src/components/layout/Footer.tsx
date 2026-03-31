import Link from "next/link";
import { BookOpen } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-8 px-[var(--page-pad)] py-12 md:flex-row md:items-start md:justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-primary)] font-mono text-xs font-bold text-white">
              FB
            </span>
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {SITE_CONFIG.name}
            </span>
          </div>
          <p className="max-w-xs text-sm text-[var(--text-muted)]">
            Founder-Architect building enterprise SaaS infrastructure.
            Future Beyond Tech &middot; FIROSE Enterprises.
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="GitHub profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={SITE_CONFIG.medium}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Medium blog"
          >
            <BookOpen size={18} />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-[var(--page-pad)] py-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Feroze Basha. Engineered, not templated.
          </p>
          <Link
            href="#main"
            className="text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
