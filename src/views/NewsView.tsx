"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { NewsCard } from "@/components/Cards";
import Reveal from "@/components/Reveal";
import { Empty, PageHero, Pagination, SkeletonGrid } from "@/components/ui";
import { FRUIT_IMAGES } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNews } from "@/store/slices/newsSlice";

export default function NewsView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const page = Number(useSearchParams().get("sehife") || 1);
  const { items, totalPages, status } = useAppSelector((s) => s.news);

  useEffect(() => {
    dispatch(fetchNews(page));
  }, [dispatch, page]);

  return (
    <>
      <PageHero
        title="Xəbərlər"
        description="Şirkətimizin fəaliyyəti və meyvə bazarındakı son yeniliklər"
        crumbs={[{ label: "Xəbərlər" }]}
        image={FRUIT_IMAGES[8]}
      />
      <section className="section">
        <div className="container">
          {status === "loading" || status === "idle" ? (
            <SkeletonGrid count={6} cols={3} height={400} />
          ) : items.length ? (
            <div className="grid grid--3">
              {items.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 120}>
                  <NewsCard item={n} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Empty title="Hələ xəbər yoxdur" />
          )}
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => {
              router.push(p > 1 ? `/xeberler?sehife=${p}` : "/xeberler", { scroll: false });
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          />
        </div>
      </section>
    </>
  );
}
