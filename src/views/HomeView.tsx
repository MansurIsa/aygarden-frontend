"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { CategoryCard, IconCard, NewsCard, ProductCard } from "@/components/Cards";
import HeroSlider from "@/components/home/HeroSlider";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import StatsSection from "@/components/home/StatsSection";
import Reveal from "@/components/Reveal";
import { SectionHead, SkeletonGrid } from "@/components/ui";
import { FRUIT_IMAGES, imageOr } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAbout } from "@/store/slices/aboutSlice";
import { fetchCategories } from "@/store/slices/catalogSlice";
import { fetchHome } from "@/store/slices/homeSlice";
import { openApplyModal } from "@/store/slices/uiSlice";

export default function HomeView() {
  const dispatch = useAppDispatch();
  const home = useAppSelector((s) => s.home);
  const { categories, categoriesStatus } = useAppSelector((s) => s.catalog);
  const about = useAppSelector((s) => s.about.data);

  useEffect(() => {
    if (home.status === "idle") dispatch(fetchHome());
    dispatch(fetchCategories());
    if (!about) dispatch(fetchAbout());
  }, [dispatch, home.status, about]);

  const loading = home.status === "loading" || home.status === "idle";

  return (
    <>
      <HeroSlider slides={home.slides} />
      <StatsSection items={home.statistics} />

      {/* Haqqımızda qısa */}
      <section className="section">
        <div className="container about-split">
          <Reveal variant="left" className="about-media">
            <div className="about-media__main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageOr(about?.image, 2)} alt="aygarden.az bağları" />
            </div>
            <div className="about-media__second">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={about?.image_secondary || FRUIT_IMAGES[3]} alt="Təzə meyvələr" />
            </div>
            <div className="about-media__badge">
              <strong>{about?.experience_years ?? 10}+</strong>
              <span>il təcrübə</span>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow">{about?.subtitle || "Haqqımızda"}</span>
            <h2 className="section-title">{about?.title || "Təbiətdən süfrənizə"}</h2>
            <div className="rich-text">
              <p>{about?.content?.split("\n\n")[0]}</p>
            </div>
            <ul className="check-list">
              {(about?.advantages ?? []).slice(0, 4).map((a) => (
                <li key={a.id}>
                  <FaCheck /> {a.title}
                </li>
              ))}
            </ul>
            <Link href="/haqqimizda" className="btn btn--primary">
              Ətraflı <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Kateqoriyalar */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Kateqoriyalar"
            title="Məhsul"
            accent="kateqoriyalarımız"
            description="Mövsümün ən təzə meyvələrini kateqoriyalar üzrə kəşf edin."
          />
          {categoriesStatus === "loading" && !categories.length ? (
            <SkeletonGrid count={3} cols={3} height={340} />
          ) : (
            <div className="grid grid--3">
              {categories.slice(0, 6).map((c, i) => (
                <Reveal key={c.id} delay={(i % 3) * 120}>
                  <CategoryCard category={c} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Seçilmiş məhsullar */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Məhsullar"
            title="Seçilmiş"
            accent="məhsullar"
            description="Bağlarımızdan və tərəfdaş fermalardan ən çox tələb olunan məhsullar."
          />
          {loading ? (
            <SkeletonGrid count={4} />
          ) : (
            <div className="grid grid--4">
              {home.featured.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
          <Reveal className="text-center" delay={100}>
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Link href="/mehsullar" className="btn btn--outline">
                Bütün məhsullar <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Üstünlüklər */}
      {about && about.advantages.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead eyebrow="Niyə biz?" title="Bizim" accent="üstünlüklərimiz" />
            <div className="grid grid--3">
              {about.advantages.slice(0, 6).map((a, i) => (
                <Reveal key={a.id} delay={(i % 3) * 120}>
                  <IconCard item={a} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Reveal variant="zoom" className="cta">
            <div className="cta__bg" style={{ backgroundImage: `url(${FRUIT_IMAGES[1]})` }} />
            <div>
              <h2>Topdan sifariş və əməkdaşlıq üçün</h2>
              <p>Müraciətinizi göndərin — komandamız sizə ən uyğun təklifi hazırlasın.</p>
            </div>
            <button className="btn btn--primary" onClick={() => dispatch(openApplyModal())}>
              Müraciət et <FaArrowRight />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Xəbərlər */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Xəbərlər" title="Son" accent="yeniliklər" />
          {loading ? (
            <SkeletonGrid count={3} cols={3} height={400} />
          ) : (
            <div className="grid grid--3">
              {home.latestNews.map((n, i) => (
                <Reveal key={n.id} delay={i * 120}>
                  <NewsCard item={n} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tərəfdaşlar */}
      {home.partners.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead eyebrow="Tərəfdaşlar" title="Beynəlxalq" accent="tərəfdaşlarımız" />
          </div>
          <PartnersMarquee partners={home.partners} />
        </section>
      )}
    </>
  );
}
