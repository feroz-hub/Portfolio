"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Only on desktop, no touch, no reduced motion
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReduced) return;

    // Signal that we should render the cursor elements
    setMounted(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track hover state on interactive elements
    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, select, textarea, [data-cursor-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, select, textarea, [data-cursor-hover]")
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    // Hide default cursor via CSS class
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Render nothing on server AND first client render (avoids hydration mismatch)
  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-[var(--accent-glow)]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring" as const, stiffness: 500, damping: 28, mass: 0.3 }}
      />

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full border border-[var(--accent-primary)]/40"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.6)"
            : "rgba(124, 58, 237, 0.3)",
        }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  );
}
