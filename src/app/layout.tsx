import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import type { ReactNode } from "react";
import ApplyModal from "@/components/ApplyModal";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { serverFetch } from "@/lib/server";
import type { SiteSettings } from "@/types";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-main",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a7034",
};

export async function generateMetadata(): Promise<Metadata> {
  const s = await serverFetch<SiteSettings>("/settings/");
  const name = s?.site_name || "aygarden.az";
  return {
    title: { default: `${name} — ${s?.slogan || "Təzə meyvələr"}`, template: `%s | ${name}` },
    description: s?.meta_description || "aygarden.az — təzə meyvələrin kataloqu.",
    keywords: s?.meta_keywords || undefined,
    icons: { icon: s?.favicon || "/favicon.ico", apple: s?.favicon || "/logo-icon.png" },
    openGraph: { siteName: name, images: s?.logo ? [s.logo] : ["/logo.png"], locale: "az_AZ" },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" className={nunito.variable}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <ApplyModal />
          <FloatingButtons />
        </Providers>
      </body>
    </html>
  );
}
