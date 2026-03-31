"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "glow-card glass relative overflow-hidden rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:border-[var(--border-strong)]",
        className
      )}
      onPointerMove={handlePointerMove}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
