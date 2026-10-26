import type { Metadata } from "next";
import { Suspense } from "react";
import SearchView from "@/views/SearchView";

export const metadata: Metadata = { title: "Axtarış" };

export default function SearchPage() {
  return (
    <Suspense>
      <SearchView />
    </Suspense>
  );
}
