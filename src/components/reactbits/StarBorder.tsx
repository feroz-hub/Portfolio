"use client";

import { cn } from "@/lib/utils";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
}

export function StarBorder({
  children,
  className = "",
  color = "#7c3aed",
  speed = "6s",
  as: Component = "button",
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={cn("star-border-container relative inline-block overflow-hidden rounded-[var(--radius-lg)]", className)}
      {...rest}
    >
      {/* Top animated gradient */}
      <div
        className="pointer-events-none absolute left-[-250%] top-[-12px] z-0 h-1/2 w-[300%] rounded-[50%] opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-move-top ${speed} linear infinite alternate`,
        }}
      />
      {/* Bottom animated gradient */}
      <div
        className="pointer-events-none absolute bottom-[-12px] right-[-250%] z-0 h-1/2 w-[300%] rounded-[50%] opacity-70"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animation: `star-move-bottom ${speed} linear infinite alternate`,
        }}
      />
      {/* Inner content */}
      <div className="relative z-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-primary)] px-6 py-3 text-center font-medium text-white">
        {children}
      </div>
    </Component>
  );
}
