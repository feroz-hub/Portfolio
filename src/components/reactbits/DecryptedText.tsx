"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view";
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "hover");

  const containerRef = useRef<HTMLSpanElement>(null);

  const availableChars = useMemo(() => characters.split(""), [characters]);

  const shuffleText = useCallback(
    (original: string, revealed: Set<number>) => {
      return original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (revealed.has(i)) return original[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const getNextIndex = useCallback(
    (revealedSet: Set<number>) => {
      const len = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return len - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(len / 2);
          const offset = Math.floor(revealedSet.size / 2);
          return revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
        }
        default:
          return revealedSet.size;
      }
    },
    [revealDirection, text.length]
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;
    const interval = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (prev.size < text.length) {
            const nextIndex = getNextIndex(prev);
            const next = new Set(prev);
            next.add(nextIndex);
            setDisplayText(shuffleText(text, next));
            return next;
          } else {
            clearInterval(interval);
            setIsAnimating(false);
            setIsDecrypted(true);
            return prev;
          }
        } else {
          setDisplayText(shuffleText(text, prev));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isAnimating, text, speed, maxIterations, sequential, getNextIndex, shuffleText]);

  // View observer
  useEffect(() => {
    if (animateOn !== "view") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (animateOn !== "hover" || isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    if (animateOn !== "hover") return;
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
  };

  const hoverProps =
    animateOn === "hover"
      ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
      : {};

  return (
    <span
      className={cn("inline-block whitespace-pre-wrap", parentClassName)}
      ref={containerRef}
      {...hoverProps}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span
              key={index}
              className={isRevealed ? className : cn("text-[var(--accent-primary)]", encryptedClassName)}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
