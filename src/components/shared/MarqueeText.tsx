"use client";

import { cn } from "@/lib/utils";

interface MarqueeTextProps {
  items: readonly string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedMap = {
  slow: "40s",
  normal: "30s",
  fast: "20s",
};

export function MarqueeText({
  items,
  className,
  speed = "normal",
}: MarqueeTextProps) {
  const duplicated = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-[var(--border)] py-4",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="flex w-max gap-8 animate-marquee"
        style={{ animationDuration: speedMap[speed] }}
      >
        {duplicated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap font-mono text-sm text-[var(--text-muted)]"
          >
            {item}
            <span className="mx-4 text-[var(--accent-primary)]">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
