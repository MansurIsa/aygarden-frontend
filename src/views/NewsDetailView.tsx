"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { Empty, PageHero, SkeletonGrid } from "@/components/ui";
import { formatDate, imageOr } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNewsDetail } from "@/store/slices/newsSlice";

export default function NewsDetailView({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const { detail: n, detailStatus } = useAppSelector((s) => s.news);

  useEffect(() => {
    dispatch(fetchNewsDetail(slug));
  }, [dispatch, slug]);

  if (detailStatus === "failed") {
    return (
      <>
        <PageHero title="Xəbər tapılmadı" crumbs={[{ href: "/xeberler", label: "Xəbərlər" }]} />
        <section className="section">
          <Empty title="Axtardığınız xəbər mövcud deyil">
            <Link href="/xeberler" className="btn btn--primary">
              Xəbərlərə qayıt
            </Link>
          </Empty>
        </section>
      </>
    );
  }

  if (!n || n.slug !== slug) {
    return (
      <>
        <PageHero title="Yüklənir..." crumbs={[{ href: "/xeberler", label: "Xəbərlər" }]} />
        <section className="section">
          <div className="container">
            <SkeletonGrid count={1} cols={2} height={420} />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title={n.title}
        description={formatDate(n.published_at)}
        crumbs={[{ href: "/xeberler", label: "Xəbərlər" }, { label: n.title.slice(0, 40) + (n.title.length > 40 ? "…" : "") }]}
        image={n.image}
      />
      <section className="section">
        <div className="container article">
          <Reveal>
            <div className="article__cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageOr(n.image, n.id + 5)} alt={n.title} />
            </div>
            <div className="article__body">
              {n.content.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 30 }}>
              <Link href="/xeberler" className="btn btn--outline">
                <FaArrowLeft /> Bütün xəbərlər
              </Link>
              <SocialLinks variant="dark" />
            </div>
          </Reveal>

          {n.latest.length > 0 && (
            <Reveal variant="right" className="aside-box">
              <h3>Son xəbərlər</h3>
              {n.latest.map((l) => (
                <Link key={l.id} href={`/xeberler/${l.slug}`} className="mini-news">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageOr(l.image, l.id + 5)} alt={l.title} />
                  <div>
                    <strong>{l.title}</strong>
                    <small>{formatDate(l.published_at)}</small>
                  </div>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
