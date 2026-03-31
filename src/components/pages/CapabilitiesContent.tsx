"use client";

import { Shield, Cpu, Network, Database, TestTube, Users } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { StarBorder } from "@/components/reactbits/StarBorder";

const SERVICES = [
  {
    icon: Cpu,
    kicker: "Fractional CTO",
    title: "Technical leadership without the full-time commitment.",
    description:
      "Architecture reviews, roadmap alignment, and engineering culture guidance for early-stage to Series C companies.",
  },
  {
    icon: Shield,
    kicker: "Secure API Design",
    title: "OAuth 2.0, OIDC, and identity-first backend architecture.",
    description:
      "From custom identity providers to zero-trust gateways — security built into the foundation, not bolted on after.",
  },
  {
    icon: Network,
    kicker: "Architecture Assessment",
    title: "Evaluate, document, and improve your system design.",
    description:
      "Technical due diligence for investors, migration planning for growing teams, and ADRs that actually get read.",
  },
  {
    icon: Database,
    kicker: "Microservices Transformation",
    title: "From monolith to bounded contexts without the drama.",
    description:
      "Incremental decomposition, clear service boundaries, and messaging patterns that keep teams autonomous.",
  },
  {
    icon: TestTube,
    kicker: "Quality Engineering",
    title: "Test automation placed where it protects delivery.",
    description:
      "Playwright, Selenium, backend validation — guardrails that catch regressions before they reach production.",
  },
  {
    icon: Users,
    kicker: "Team Augmentation",
    title: "Senior .NET engineers integrated with your delivery flow.",
    description:
      "Embedded backend specialists who ship production code from week one and leave your team stronger.",
  },
];

const INDUSTRIES = [
  "FinTech",
  "HealthTech",
  "SaaS / PaaS",
  "Enterprise Software",
  "PropTech",
  "E-Commerce",
];

export function CapabilitiesContent() {
  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="cat /capabilities">
        {/* Header */}
        <ScrollReveal>
          <ShinyText
            text="Services & Expertise"
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            color="#7c3aed"
            shineColor="#a78bfa"
            speed={4}
          />
        </ScrollReveal>

        <div className="mb-12 max-w-2xl">
          <BlurText
            text="The backend work I'm strongest at when stakes are real."
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            delay={60}
            animateBy="words"
            direction="bottom"
            stepDuration={0.4}
          />
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
              Disciplined backend thinking: design the right seams early, secure the
              important paths, and make ongoing delivery easier for the team.
            </p>
          </ScrollReveal>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.kicker} delay={i * 0.08}>
                <SpotlightCard
                  className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] p-6"
                  spotlightColor="rgba(124, 58, 237, 0.1)"
                >
                  <Icon size={24} className="text-[var(--accent-primary)]" />
                  <ShinyText
                    text={service.kicker}
                    className="font-mono text-xs uppercase tracking-widest"
                    color="#8b5cf6"
                    shineColor="#c4b5fd"
                    speed={5}
                  />
                  <h3 className="text-lg font-semibold leading-snug text-[var(--text-primary)]">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {service.description}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Industries */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16">
            <h3 className="mb-6 font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
              Industries served
            </h3>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map((ind) => (
                <StarBorder key={ind} as="div" color="#7c3aed" speed="8s">
                  <span className="text-sm text-[var(--text-secondary)]">{ind}</span>
                </StarBorder>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </div>
  );
}
