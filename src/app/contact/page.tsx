import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Schedule an architecture consultation, discuss fractional CTO engagements, or explore team augmentation with Feroze Basha.",
};

export default function ContactPage() {
  return <ContactContent />;
}
