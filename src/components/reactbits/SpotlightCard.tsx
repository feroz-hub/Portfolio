"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(124, 58, 237, 0.15)",
  spotlightSize = 350,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = divRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);
      el.style.setProperty("--spotlight-color", spotlightColor);
      el.style.setProperty("--spotlight-size", `${spotlightSize}px`);
    },
    [spotlightColor, spotlightSize]
  );

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-card relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-secondary)] p-6 transition-colors duration-300 hover:border-[var(--border-strong)]",
        className
      )}
    >
      {children}
    </div>
  );
}
