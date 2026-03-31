"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  color?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
  disabled?: boolean;
}

export function ShinyText({
  text,
  className = "",
  color = "#a1a1aa",
  shineColor = "#e4e4e7",
  speed = 3,
  spread = 120,
  disabled = false,
}: ShinyTextProps) {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationDuration = speed * 1000;

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [speed, progress]);

  useAnimationFrame((time) => {
    if (disabled) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += delta;

    const fullCycle = animationDuration * 2;
    const cycleTime = elapsedRef.current % fullCycle;

    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100);
    } else {
      progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
    }
  });

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundPosition,
      }}
    >
      {text}
    </motion.span>
  );
}
