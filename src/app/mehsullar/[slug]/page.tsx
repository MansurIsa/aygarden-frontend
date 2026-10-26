import type { Metadata } from "next";
import { serverFetch } from "@/lib/server";
import type { ProductDetail } from "@/types";
import ProductDetailView from "@/views/ProductDetailView";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await serverFetch<ProductDetail>(`/products/${slug}/`);
  return {
    title: p?.name || "Məhsul",
    description: p?.short_description,
    openGraph: p?.image ? { images: [p.image] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  return <ProductDetailView slug={slug} />;
}
