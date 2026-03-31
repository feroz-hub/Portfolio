"use client";

import { Mail, BookOpen, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/Icons";
import { Section } from "@/components/shared/Section";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { StarBorder } from "@/components/reactbits/StarBorder";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";
import { TiltCard } from "@/components/reactbits/TiltCard";
import { SITE_CONFIG } from "@/lib/constants";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "ferozebasha",
    href: SITE_CONFIG.linkedin,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "feroz-hub",
    href: SITE_CONFIG.github,
  },
  {
    icon: BookOpen,
    label: "Medium",
    value: "@ferozebasha",
    href: SITE_CONFIG.medium,
  },
];

const ACCEPTING = [
  "Architecture consultations & system assessments",
  "Fractional CTO engagements (Series A–C)",
  "Senior .NET team augmentation",
  "Secure API & identity-focused projects",
  "Technical due diligence for investors",
];

export function ContactContent() {
  return (
    <div className="pt-[var(--header-height)]">
      <Section terminal="cat /contact">
        {/* Header */}
        <ScrollReveal>
          <ShinyText
            text="Let's Talk"
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            color="#7c3aed"
            shineColor="#a78bfa"
            speed={4}
          />
        </ScrollReveal>

        <div className="mb-12 max-w-2xl">
          <BlurText
            text="If you need a backend that feels trustworthy, let's build it."
            tag="h2"
            className="font-[family-name:var(--font-display)] text-3xl font-normal leading-tight text-[var(--text-primary)] md:text-4xl lg:text-5xl"
            delay={60}
            animateBy="words"
            direction="bottom"
            stepDuration={0.4}
          />
          <ScrollReveal delay={0.3}>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] text-pretty md:text-lg">
              I&apos;m most useful when a team needs stable APIs, stronger security, better
              architecture discipline, or someone who can help the backend become easier
              to ship with.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Left — Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              {CONTACT_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <ScrollReveal key={link.label} delay={i * 0.08}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                    >
                      <SpotlightCard
                        className="flex items-center gap-4 rounded-[var(--radius-md)] p-4"
                        spotlightColor="rgba(124, 58, 237, 0.1)"
                      >
                        <Icon size={20} className="shrink-0 text-[var(--accent-primary)]" />
                        <div>
                          <p className="text-xs text-[var(--text-muted)]">{link.label}</p>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {link.label === "Email" ? (
                              <DecryptedText
                                text={link.value}
                                animateOn="view"
                                speed={30}
                                sequential
                                revealDirection="start"
                              />
                            ) : (
                              link.value
                            )}
                          </p>
                        </div>
                      </SpotlightCard>
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.4}>
              <a href="/files/FerozeBasha_Resume_2026.pdf" download>
                <StarBorder as="div" color="#7c3aed" speed="6s">
                  <span className="inline-flex items-center gap-2 text-sm">
                    <Download size={16} />
                    Download Resume
                  </span>
                </StarBorder>
              </a>
            </ScrollReveal>
          </div>

          {/* Right — Currently Accepting */}
          <ScrollReveal direction="right" delay={0.2}>
            <TiltCard rotateAmplitude={3} scaleOnHover={1.01}>
              <SpotlightCard
                className="rounded-[var(--radius-lg)] p-6"
                spotlightColor="rgba(124, 58, 237, 0.08)"
              >
                <ShinyText
                  text="Currently Accepting"
                  className="mb-4 font-mono text-xs uppercase tracking-widest"
                  color="#7c3aed"
                  shineColor="#a78bfa"
                  speed={5}
                />
                <ul className="space-y-3">
                  {ACCEPTING.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </TiltCard>
          </ScrollReveal>
        </div>
      </Section>
    </div>
  );
}
