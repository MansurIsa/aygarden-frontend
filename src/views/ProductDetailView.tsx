"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaBoxOpen, FaCalendarDays, FaLayerGroup, FaLocationDot, FaPhone } from "react-icons/fa6";
import { ProductCard } from "@/components/Cards";
import Reveal from "@/components/Reveal";
import { Empty, PageHero, SectionHead, SkeletonGrid } from "@/components/ui";
import { imageOr } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProduct } from "@/store/slices/catalogSlice";
import { openApplyModal } from "@/store/slices/uiSlice";

export default function ProductDetailView({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const { detail: p, detailStatus } = useAppSelector((s) => s.catalog);
  const phone = useAppSelector((s) => s.settings.data?.phone);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProduct(slug));
    setActiveImg(null);
  }, [dispatch, slug]);

  if (detailStatus === "failed") {
    return (
      <>
        <PageHero title="Məhsul tapılmadı" crumbs={[{ href: "/mehsullar", label: "Məhsullar" }]} />
        <section className="section">
          <Empty title="Axtardığınız məhsul mövcud deyil">
            <Link href="/mehsullar" className="btn btn--primary">
              Məhsullara qayıt
            </Link>
          </Empty>
        </section>
      </>
    );
  }

  if (!p || p.slug !== slug) {
    return (
      <>
        <PageHero title="Yüklənir..." crumbs={[{ href: "/mehsullar", label: "Məhsullar" }]} />
        <section className="section">
          <div className="container">
            <SkeletonGrid count={2} cols={2} height={460} />
          </div>
        </section>
      </>
    );
  }

  const images = [imageOr(p.image, p.id), ...p.gallery.map((g) => g.image)];
  const main = activeImg || images[0];
  const specs = [
    { icon: <FaLayerGroup />, label: "Kateqoriya", value: p.category.name },
    { icon: <FaLocationDot />, label: "Mənşə", value: p.origin },
    { icon: <FaCalendarDays />, label: "Mövsüm", value: p.season },
    { icon: <FaBoxOpen />, label: "Qablaşdırma", value: p.packaging },
  ].filter((s) => s.value);

  return (
    <>
      <PageHero
        title={p.name}
        crumbs={[
          { href: "/mehsullar", label: "Məhsullar" },
          { href: `/mehsullar?kateqoriya=${p.category.slug}`, label: p.category.name },
          { label: p.name },
        ]}
        image={p.image}
      />

      <section className="section">
        <div className="container pd">
          <Reveal variant="left" className="pd__gallery">
            <div className="pd__main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={main} src={main} alt={p.name} />
            </div>
            {images.length > 1 && (
              <div className="pd__thumbs">
                {images.map((src) => (
                  <button key={src} className={src === main ? "is-active" : ""} onClick={() => setActiveImg(src)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal variant="right" className="pd__info">
            <span className="eyebrow">{p.category.name}</span>
            <h1>{p.name}</h1>
            <p className="pd__lead">{p.short_description}</p>

            <div className="pd__specs">
              {specs.map((s) => (
                <div key={s.label} className="spec">
                  <span className="spec__icon">{s.icon}</span>
                  <div>
                    <small>{s.label}</small>
                    <strong>{s.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="pd__actions">
              <button className="btn btn--primary" onClick={() => dispatch(openApplyModal())}>
                Sifariş üçün müraciət <FaArrowRight />
              </button>
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn--outline">
                  <FaPhone /> {phone}
                </a>
              )}
            </div>

            {p.description && (
              <div className="pd__desc rich-text">
                <h3>Məhsul haqqında</h3>
                {p.description.split("\n\n").map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {p.related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead eyebrow="Oxşar" title="Bənzər" accent="məhsullar" />
            <div className="grid grid--4">
              {p.related.map((r, i) => (
                <Reveal key={r.id} delay={i * 100}>
                  <ProductCard product={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
