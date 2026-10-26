"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CategoryCard, NewsCard, ProductCard } from "@/components/Cards";
import Reveal from "@/components/Reveal";
import { Empty, PageHero, SectionHead, SkeletonGrid } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { runSearch } from "@/store/slices/searchSlice";

export default function SearchView() {
  const q = useSearchParams().get("q")?.trim() || "";
  const dispatch = useAppDispatch();
  const { results, status } = useAppSelector((s) => s.search);

  useEffect(() => {
    if (q.length >= 2) dispatch(runSearch(q));
  }, [dispatch, q]);

  const total = results ? results.products.length + results.categories.length + results.news.length : 0;

  return (
    <>
      <PageHero title={q ? `“${q}”` : "Axtarış"} description="Axtarış nəticələri" crumbs={[{ label: "Axtarış" }]} />
      <section className="section">
        <div className="container">
          {q.length < 2 ? (
            <Empty title="Axtarış üçün ən azı 2 simvol daxil edin" />
          ) : status === "loading" ? (
            <SkeletonGrid count={4} />
          ) : !total ? (
            <Empty title="Heç nə tapılmadı">
              <p>Başqa açar söz ilə yenidən cəhd edin.</p>
            </Empty>
          ) : (
            results && (
              <>
                {results.products.length > 0 && (
                  <>
                    <SectionHead eyebrow={`${results.products.length} nəticə`} title="Məhsullar" align="left" />
                    <div className="grid grid--4" style={{ marginBottom: 70 }}>
                      {results.products.map((p, i) => (
                        <Reveal key={p.id} delay={(i % 4) * 90}>
                          <ProductCard product={p} />
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
                {results.categories.length > 0 && (
                  <>
                    <SectionHead eyebrow={`${results.categories.length} nəticə`} title="Kateqoriyalar" align="left" />
                    <div className="grid grid--3" style={{ marginBottom: 70 }}>
                      {results.categories.map((c) => (
                        <Reveal key={c.id}>
                          <CategoryCard category={c} />
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
                {results.news.length > 0 && (
                  <>
                    <SectionHead eyebrow={`${results.news.length} nəticə`} title="Xəbərlər" align="left" />
                    <div className="grid grid--3">
                      {results.news.map((n) => (
                        <Reveal key={n.id}>
                          <NewsCard item={n} />
                        </Reveal>
                      ))}
                    </div>
                  </>
                )}
              </>
            )
          )}
        </div>
      </section>
    </>
  );
}
