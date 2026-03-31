"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const DEFAULT_SCROLL_STATE = { scrolled: false, progress: 0 };

export function Header() {
  const pathname = usePathname();
  const [mobileMenuRoute, setMobileMenuRoute] = useState<string | null>(null);
  const mobileOpen = mobileMenuRoute === pathname;

  const getScrollSnapshot = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    return {
      scrolled: scrollTop > 24,
      progress: Math.min(100, progress),
    };
  }, []);

  const subscribeToScroll = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    window.addEventListener("resize", onStoreChange);
    return () => {
      window.removeEventListener("scroll", onStoreChange);
      window.removeEventListener("resize", onStoreChange);
    };
  }, []);

  const { scrolled, progress: scrollProgress } = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    () => DEFAULT_SCROLL_STATE
  );

  const closeMobileMenu = useCallback(() => {
    setMobileMenuRoute(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuRoute((currentRoute) => (currentRoute === pathname ? null : pathname));
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        )}
        style={{ height: "var(--header-height)" }}
      >
        <div className="mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between px-[var(--page-pad)]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--text-primary)] no-underline"
            onClick={closeMobileMenu}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-primary)] font-mono text-sm font-bold text-white">
              FB
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <strong className="text-sm font-semibold tracking-tight">
                {SITE_CONFIG.name}
              </strong>
              <span className="text-xs text-[var(--text-muted)]">
                Founder-Architect
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                    isActive
                      ? "text-[var(--accent-glow)] bg-[var(--accent-primary)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-strong)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/files/FerozeBasha_Resume_2026.pdf"
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              download
              onClick={closeMobileMenu}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-glow)]"
              onClick={closeMobileMenu}
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-strong)] md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <nav
          id="mobile-nav"
          className={cn(
            "fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 flex flex-col bg-[var(--bg-primary)]/95 backdrop-blur-2xl transition-all duration-300 md:hidden",
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-1 flex-col gap-1 p-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "rounded-lg px-4 py-3 text-lg transition-colors",
                    isActive
                      ? "text-[var(--accent-glow)] bg-[var(--accent-primary)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-3 border-t border-[var(--border)] p-6">
            <Link
              href="/files/FerozeBasha_Resume_2026.pdf"
              className="rounded-lg border border-[var(--border)] px-4 py-3 text-center text-sm text-[var(--text-secondary)]"
              download
              onClick={closeMobileMenu}
            >
              Download Resume
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-[var(--accent-primary)] px-4 py-3 text-center text-sm font-medium text-white"
              onClick={closeMobileMenu}
            >
              Let&apos;s Talk
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
