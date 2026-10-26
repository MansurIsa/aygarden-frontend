import type { Metadata } from "next";
import { Suspense } from "react";
import NewsView from "@/views/NewsView";

export const metadata: Metadata = { title: "Xəbərlər" };

export default function NewsPage() {
  return (
    <Suspense>
      <NewsView />
    </Suspense>
  );
}
