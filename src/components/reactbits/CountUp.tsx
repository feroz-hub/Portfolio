"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  suffix?: string;
  prefix?: string;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  separator = "",
  suffix = "",
  prefix = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatValue = useCallback(
    (latest: number) => {
      const rounded = Math.round(latest);
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      };
      const formatted = new Intl.NumberFormat("en-US", options).format(rounded);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = `${prefix}${formatValue(direction === "down" ? to : from)}${suffix}`;
    }
  }, [from, to, direction, formatValue, prefix, suffix]);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${formatValue(latest)}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, formatValue, prefix, suffix]);

  return <span className={className} ref={ref} />;
}
