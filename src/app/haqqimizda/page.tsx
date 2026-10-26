import type { Metadata } from "next";
import AboutView from "@/views/AboutView";

export const metadata: Metadata = { title: "Haqqımızda" };

export default function AboutPage() {
  return <AboutView />;
}
