import type { Metadata } from "next";
import ContactView from "@/views/ContactView";

export const metadata: Metadata = { title: "Əlaqə" };

export default function ContactPage() {
  return <ContactView />;
}
