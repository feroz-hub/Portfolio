import type { Metadata } from "next";
import { ExperienceContent } from "@/components/pages/ExperienceContent";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional timeline — from security framework engineering to founding Future Beyond Tech and leading FIROSE Enterprises.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
