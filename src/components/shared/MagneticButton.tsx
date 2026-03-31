"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  strength?: number;
}

const variantStyles = {
  primary:
    "bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-glow)] shadow-lg shadow-[var(--accent-primary)]/20",
  secondary:
    "border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]",
  ghost:
    "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-strong)]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  size = "md",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setPosition({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    },
    [strength]
  );

  const handlePointerLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const sharedProps = {
    ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
    className: cn(
      "inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium transition-colors duration-200",
      variantStyles[variant],
      sizeStyles[size],
      className
    ),
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 20, mass: 0.5 },
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...sharedProps} {...motionProps}>
      {children}
    </motion.button>
  );
}
