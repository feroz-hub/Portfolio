"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { BlurText } from "@/components/reactbits/BlurText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { TiltCard } from "@/components/reactbits/TiltCard";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-[var(--header-height)]">
      <HeroScene />

      <div className="relative mx-auto grid max-w-[var(--container-max)] gap-12 px-[var(--page-pad)] lg:grid-cols-[1fr,1fr] lg:items-center lg:gap-16">
        {/* Left — Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <ShinyText
                text="Founder-Architect"
                className="font-mono text-xs uppercase tracking-widest"
                color="#7c3aed"
                shineColor="#a78bfa"
                speed={4}
              />
              <span className="flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]">
                <span className="status-dot" />
                Building in production
              </span>
            </div>
          </motion.div>

          <BlurText
            text="I architect systems that survive scale."
            tag="h1"
            className="font-[family-name:var(--font-display)] text-4xl font-normal leading-[1.1] text-[var(--text-primary)] md:text-5xl lg:text-6xl"
            delay={80}
            animateBy="words"
            direction="bottom"
            stepDuration={0.5}
          />

          <motion.p
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Founder of{" "}
            <DecryptedText
              text="Future Beyond Tech"
              className="font-semibold text-[var(--text-primary)]"
              animateOn="view"
              speed={40}
              sequential
              revealDirection="start"
            />{" "}
            &middot; CEO of{" "}
            <DecryptedText
              text="FIROSE Enterprises"
              className="font-semibold text-[var(--text-primary)]"
              animateOn="view"
              speed={40}
              sequential
              revealDirection="end"
            />
            . Building RentFlow, Zentra &amp; the infrastructure layer for Indian SaaS.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/systems"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-glow)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/20"
            >
              Explore Systems
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] px-6 py-3 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              Schedule Consultation
            </Link>
            <a
              href="/files/FerozeBasha_Resume_2026.pdf"
              download
              className="inline-flex items-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { label: "Stack", value: ".NET 8, Next.js, PostgreSQL" },
              { label: "Focus", value: "Identity, APIs, Architecture" },
              { label: "Mode", value: "Founder-led engineering" },
            ].map((signal) => (
              <div key={signal.label} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  {signal.label}
                </span>
                <span className="text-sm font-medium text-[var(--text-secondary)]">
                  {signal.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Terminal Panel with Tilt */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard rotateAmplitude={6} scaleOnHover={1.02}>
            <div className="glass-strong overflow-hidden rounded-[var(--radius-xl)] p-1">
              <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-green-500/60" />
                <span className="ml-4 font-mono text-xs text-[var(--text-muted)]">
                  control-plane.log
                </span>
              </div>

              <div className="space-y-3 p-5 font-mono text-sm">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                    LIVE
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    RentFlow — Multi-tenant property management OS
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded bg-[var(--accent-primary)]/20 px-2 py-0.5 text-xs font-medium text-[var(--accent-glow)]">
                    BUILDING
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    Zentra — Custom OAuth 2.0/OIDC identity provider
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 rounded bg-cyan-500/20 px-2 py-0.5 text-xs font-medium text-cyan-400">
                    SCAFFOLD
                  </span>
                  <span className="text-[var(--text-secondary)]">
                    Vyxnos Shield — Zero-trust API gateway (YARP + NativeAOT)
                  </span>
                </div>

                <div className="my-4 border-t border-[var(--border)]" />

                <div className="text-[var(--text-muted)]">
                  <span className="text-[var(--accent-primary)]">$</span> cat /status/firose
                </div>
                <div className="text-[var(--text-secondary)]">
                  FIROSE Enterprises — 5 FMCG brands, e-commerce, digital ops
                </div>

                <div className="mt-4 text-[var(--text-muted)]">
                  <span className="text-[var(--accent-primary)]">$</span> uptime
                </div>
                <div className="text-emerald-400">
                  All systems operational &mdash; 2022 → now
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
