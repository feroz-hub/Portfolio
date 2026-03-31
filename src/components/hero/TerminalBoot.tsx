"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalBootProps {
  onComplete: () => void;
  duration?: number;
}

const BOOT_LINES = [
  { text: "INITIALIZING CONTROL PLANE...", delay: 0 },
  { text: "Loading identity modules ████████████ OK", delay: 300 },
  { text: "Mounting architecture layers ██████████ OK", delay: 600 },
  { text: "Verifying security posture ████████████ OK", delay: 900 },
  { text: "Connecting service mesh ██████████████ OK", delay: 1200 },
  { text: "", delay: 1500 },
  { text: "ALL SYSTEMS OPERATIONAL", delay: 1600, highlight: true },
];

export function TerminalBoot({ onComplete, duration = 2200 }: TerminalBootProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setExiting(true);
    const timer = setTimeout(onComplete, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    // Progressively reveal lines
    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, line.delay)
      );
    });

    // Trigger exit after duration
    timers.push(setTimeout(handleComplete, duration));

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete, handleComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[var(--bg-primary)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full max-w-lg px-6">
            {/* Terminal chrome */}
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
              <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                <span className="ml-3 font-mono text-[11px] text-[var(--text-muted)]">
                  fbt-control-plane
                </span>
              </div>

              {/* Terminal body */}
              <div className="bg-[var(--bg-primary)] p-5 font-mono text-sm leading-relaxed">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className={
                      line.highlight
                        ? "mt-1 font-bold text-emerald-400"
                        : line.text === ""
                          ? "h-3"
                          : "text-[var(--text-muted)]"
                    }
                  >
                    {line.text && !line.highlight && (
                      <span className="text-[var(--accent-primary)]">$ </span>
                    )}
                    {line.highlight && (
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    )}
                    {line.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {visibleLines < BOOT_LINES.length && (
                  <span className="inline-block h-4 w-2 animate-pulse bg-[var(--accent-primary)]" />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
