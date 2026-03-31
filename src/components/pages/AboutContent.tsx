"use client";

import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlurText } from "@/components/reactbits/BlurText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { TiltCard } from "@/components/reactbits/TiltCard";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

const PHILOSOPHY = [
  {
    title: "Security isn't a layer — it's the foundation.",
    body: "Every system I build starts with identity, access control, and threat modeling before the first endpoint.",
  },
  {
    title: "Architecture should survive the next hire.",
    body: "Clean boundaries, explicit contracts, and documentation that makes the codebase approachable for new engineers.",
  },
  {
    title: "Ship with discipline, not drama.",
    body: "Automated guardrails, clear handoffs, and a delivery culture that values predictability over heroics.",
  },
  {
    title: "Build infrastructure, not dependencies.",
    body: "When we built Zentra instead of using Auth0, it wasn't NIH syndrome — it was a decision to own our identity layer.",
  },
];

export function AboutContent() {
  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="cat /about">
        {/* Eyebrow */}
        <ScrollReveal>
          <ShinyText
            text="The Founder Story"
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            color="#7c3aed"
            shineColor="#a78bfa"
            speed={4}
          />
        </ScrollReveal>

        {/* Title with BlurText */}
        <div className="mb-12 max-w-2xl">
          <BlurText
            text="Engineer → Security Specialist → Founder-Architect → CEO."
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            delay={60}
            animateBy="words"
            direction="bottom"
            stepDuration={0.4}
          />
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
              My path wasn&apos;t linear. It was shaped by production incidents, identity
              systems that had to be airtight, and the realization that the best
              architecture comes from people who&apos;ve shipped under pressure.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Narrative */}
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <ScrollReveal delay={0.1}>
              <p>
                I started deep in .NET backend systems — building authentication frameworks,
                hardening security protocols, and learning that the most important code is the
                code that protects everything else.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p>
                That conviction led me to found{" "}
                <DecryptedText
                  text="Future Beyond Tech"
                  className="font-semibold text-[var(--text-primary)]"
                  animateOn="view"
                  speed={40}
                  sequential
                  revealDirection="start"
                />
                , a backend architecture consultancy and product studio based in Chennai. We build
                infrastructure that Indian SaaS companies can trust: RentFlow for property management,
                Zentra for identity, and Vyxnos Shield for zero-trust API security.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p>
                In parallel, I lead{" "}
                <DecryptedText
                  text="FIROSE Enterprises"
                  className="font-semibold text-[var(--text-primary)]"
                  animateOn="view"
                  speed={40}
                  sequential
                  revealDirection="end"
                />
                , a Chennai-based MSME conglomerate spanning FMCG brands — Neat &amp; Fresh, The Femison,
                and AR Perfumes — with full digital operations from e-commerce to Google Ads campaigns.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p>
                The thread connecting all of this: I believe the best products are built on
                invisible backend systems that are secure, well-bounded, and designed to survive
                the next feature request without a rewrite.
              </p>
            </ScrollReveal>
          </div>

          {/* Philosophy Cards with SpotlightCard + TiltCard */}
          <div className="space-y-4">
            {PHILOSOPHY.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12} direction="right">
                <TiltCard rotateAmplitude={4} scaleOnHover={1.01}>
                  <SpotlightCard
                    className="rounded-[var(--radius-lg)] p-5"
                    spotlightColor="rgba(124, 58, 237, 0.1)"
                  >
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {card.body}
                    </p>
                  </SpotlightCard>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
