import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Feroze Basha — from security engineer to founder-architect building enterprise SaaS infrastructure across FIROSE Enterprises and Future Beyond Tech.",
};

export default function AboutPage() {
  return <AboutContent />;
}
