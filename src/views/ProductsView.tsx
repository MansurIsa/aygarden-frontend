"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ProductCard } from "@/components/Cards";
import Reveal from "@/components/Reveal";
import { Empty, PageHero, Pagination, SkeletonGrid } from "@/components/ui";
import { FRUIT_IMAGES } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories, fetchProducts } from "@/store/slices/catalogSlice";

export default function ProductsView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("kateqoriya") || "";
  const page = Number(params.get("sehife") || 1);
  const q = params.get("q") || "";

  const { categories, products, count, totalPages, productsStatus } = useAppSelector((s) => s.catalog);
  const [search, setSearch] = useState(q);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ category: category || undefined, search: q || undefined, page }));
  }, [dispatch, category, q, page]);

  const update = (next: Record<string, string | number | undefined>) => {
    const sp = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([k, v]) => (v ? sp.set(k, String(v)) : sp.delete(k)));
    router.push(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: false });
  };

  // axtarış inputu — yazmağı bitirəndən sonra URL yenilənir
  useEffect(() => {
    if (search === q) return;
    const t = setTimeout(() => update({ q: search.trim() || undefined, sehife: undefined }), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const activeCategory = categories.find((c) => c.slug === category);
  const total = categories.reduce((a, c) => a + c.product_count, 0);

  return (
    <>
      <PageHero
        title={activeCategory?.name || "Məhsullar"}
        description={activeCategory?.description || "Təzə meyvələrdən ibarət geniş məhsul kataloqumuz"}
        crumbs={activeCategory ? [{ href: "/mehsullar", label: "Məhsullar" }, { label: activeCategory.name }] : [{ label: "Məhsullar" }]}
        image={activeCategory?.image || FRUIT_IMAGES[1]}
      />

      <section className="section">
        <div className="container">
          <Reveal className="filter-bar">
            <button className={`filter-btn ${!category ? "is-active" : ""}`} onClick={() => update({ kateqoriya: undefined, sehife: undefined })}>
              Hamısı <small>{total}</small>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`filter-btn ${category === c.slug ? "is-active" : ""}`}
                onClick={() => update({ kateqoriya: c.slug, sehife: undefined })}
              >
                {c.name} <small>{c.product_count}</small>
              </button>
            ))}
          </Reveal>

          <div className="toolbar">
            <span className="toolbar__count">{productsStatus === "succeeded" ? `${count} məhsul tapıldı` : " "}</span>
            <label className="input-search">
              <FaMagnifyingGlass />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Məhsul axtar..." aria-label="Məhsul axtar" />
            </label>
          </div>

          {productsStatus === "loading" || productsStatus === "idle" ? (
            <SkeletonGrid count={8} />
          ) : products.length ? (
            <div className="grid grid--4">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Empty title="Məhsul tapılmadı">
              <p>Başqa kateqoriya seçin və ya axtarış sözünü dəyişin.</p>
            </Empty>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => {
              update({ sehife: p > 1 ? p : undefined });
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
          />
        </div>
      </section>
    </>
  );
}
