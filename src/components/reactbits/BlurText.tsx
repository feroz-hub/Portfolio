"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  threshold?: number;
  stepDuration?: number;
  tag?: "p" | "h1" | "h2" | "h3" | "span";
}

export function BlurText({
  text,
  className = "",
  delay = 100,
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  stepDuration = 0.35,
  tag: Tag = "p",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -30 }
        : { filter: "blur(10px)", opacity: 0, y: 30 },
    [direction]
  );

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
  };

  return (
    <Tag
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={`flex flex-wrap ${className}`}
    >
      {elements.map((segment, index) => (
        <motion.span
          className="inline-block will-change-[transform,filter,opacity]"
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: stepDuration,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
}
