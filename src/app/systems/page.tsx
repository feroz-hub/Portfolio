import type { Metadata } from "next";
import { SystemsContent } from "@/components/pages/SystemsContent";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Architecture portfolio — flagship SaaS products, public projects, and learning resources built by Feroze Basha.",
};

export default function SystemsPage() {
  return <SystemsContent />;
}
