import type { Metadata } from "next";
import { serverFetch } from "@/lib/server";
import type { NewsDetail } from "@/types";
import NewsDetailView from "@/views/NewsDetailView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await serverFetch<NewsDetail>(`/news/${slug}/`);
  return {
    title: n?.title || "Xəbər",
    description: n?.excerpt,
    openGraph: n?.image ? { images: [n.image] } : undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  return <NewsDetailView slug={slug} />;
}
