"use client";

import { useState, useSyncExternalStore } from "react";
import { Section, SectionHeader } from "@/components/shared/Section";
import { HomeHero } from "@/components/hero/HomeHero";
import { TerminalBoot } from "@/components/hero/TerminalBoot";
import { StatsStrip } from "@/components/hero/StatsStrip";
import { MarqueeText } from "@/components/shared/MarqueeText";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { FeaturedSystems } from "@/components/systems/FeaturedSystems";
import { TECH_STACK_MARQUEE, STATS } from "@/lib/constants";

function subscribeToSessionBoot() {
  return () => {};
}

function getSessionBootSnapshot() {
  try {
    return window.sessionStorage.getItem("fbt-booted") === "1";
  } catch {
    return false;
  }
}

export default function HomePage() {
  const sessionBooted = useSyncExternalStore<boolean | null>(
    subscribeToSessionBoot,
    getSessionBootSnapshot,
    () => null
  );
  const [bootCompleted, setBootCompleted] = useState(false);
  const booted = sessionBooted === true || bootCompleted;
  const showBoot = sessionBooted === false && !bootCompleted;

  function handleBootComplete() {
    setBootCompleted(true);
    try {
      sessionStorage.setItem("fbt-booted", "1");
    } catch {
      // sessionStorage may be unavailable
    }
  }

  return (
    <>
      <CustomCursor />

      {showBoot && !booted && (
        <TerminalBoot onComplete={handleBootComplete} />
      )}

      <HomeHero />
      <MarqueeText items={TECH_STACK_MARQUEE} />
      <StatsStrip stats={STATS} />

      <Section terminal="ls /systems --featured">
        <SectionHeader
          eyebrow="Selected Systems"
          title="Products and platforms, not placeholders."
          description="Each build below reflects real infrastructure decisions — shaping APIs, protecting workflows, and keeping architecture coherent under delivery pressure."
        />
        <FeaturedSystems />
      </Section>

      {/* CTA Banner */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-center gap-6 px-[var(--page-pad)] py-20 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--text-primary)] md:text-4xl">
            Let&apos;s build the backbone of your next platform.
          </h2>
          <p className="max-w-lg text-[var(--text-secondary)]">
            Architecture consultations, fractional CTO engagements, and senior .NET team augmentation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-8 py-4 font-medium text-white transition-colors hover:bg-[var(--accent-glow)]"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </>
  );
}
