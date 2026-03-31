import type { Metadata } from "next";
import { CapabilitiesContent } from "@/components/pages/CapabilitiesContent";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Architecture consulting, fractional CTO services, secure API design, and .NET team augmentation from Feroze Basha.",
};

export default function CapabilitiesPage() {
  return <CapabilitiesContent />;
}
