"use client";

import { useEffect } from "react";
import { FaBullseye, FaEye } from "react-icons/fa6";
import { IconCard } from "@/components/Cards";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import StatsSection from "@/components/home/StatsSection";
import Reveal from "@/components/Reveal";
import { PageHero, SectionHead, SkeletonGrid } from "@/components/ui";
import { FRUIT_IMAGES, imageOr } from "@/lib/images";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAbout } from "@/store/slices/aboutSlice";

export default function AboutView() {
  const dispatch = useAppDispatch();
  const { data, statistics, status } = useAppSelector((s) => s.about);

  useEffect(() => {
    if (!data || !statistics.length) dispatch(fetchAbout());
  }, [dispatch, data, statistics.length]);

  return (
    <>
      <PageHero
        title="Haqqımızda"
        description="Təbiətin ən təzə nemətlərini süfrənizə çatdıran komanda"
        crumbs={[{ label: "Haqqımızda" }]}
        image={FRUIT_IMAGES[2]}
      />

      {!data && status !== "failed" ? (
        <section className="section">
          <div className="container">
            <SkeletonGrid count={2} cols={2} height={420} />
          </div>
        </section>
      ) : data ? (
        <>
          {/* Giriş */}
          <section className="section">
            <div className="container about-split">
              <Reveal variant="left" className="about-media">
                <div className="about-media__main">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageOr(data.image, 2)} alt={data.title} />
                </div>
                <div className="about-media__second">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.image_secondary || FRUIT_IMAGES[3]} alt="" />
                </div>
                <div className="about-media__badge">
                  <strong>{data.experience_years}+</strong>
                  <span>il təcrübə</span>
                </div>
              </Reveal>
              <Reveal variant="right">
                <span className="eyebrow">{data.subtitle || "Haqqımızda"}</span>
                <h2 className="section-title">{data.title}</h2>
                <div className="rich-text">
                  {data.content.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Vizyon və Missiya */}
          <section className="section section--tint">
            <div className="container">
              <SectionHead eyebrow="Biz kimik" title="Vizyonumuz və" accent="Missiyamız" />
              <div className="vm-grid">
                <Reveal variant="left" className="vm-card vm-card--vision">
                  <div className="vm-card__icon">
                    <FaEye />
                  </div>
                  <h3>Vizyonumuz</h3>
                  <p>{data.vision}</p>
                </Reveal>
                <Reveal variant="right" className="vm-card vm-card--mission">
                  <div className="vm-card__icon">
                    <FaBullseye />
                  </div>
                  <h3>Missiyamız</h3>
                  <p>{data.mission}</p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Dəyərlər */}
          {data.values.length > 0 && (
            <section className="section">
              <div className="container">
                <SectionHead
                  eyebrow="Prinsiplər"
                  title="Dəyərlərimiz"
                  description="Fəaliyyətimizin əsasında duran prinsiplər."
                />
                <div className="grid grid--4">
                  {data.values.map((v, i) => (
                    <Reveal key={v.id} delay={(i % 4) * 100}>
                      <IconCard item={v} index={i} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          <StatsSection items={statistics} overlap={false} />

          {/* Üstünlüklər */}
          {data.advantages.length > 0 && (
            <section className="section">
              <div className="container">
                <SectionHead eyebrow="Niyə biz?" title="Üstünlüklərimiz" />
                <div className="grid grid--3">
                  {data.advantages.map((a, i) => (
                    <Reveal key={a.id} delay={(i % 3) * 120}>
                      <IconCard item={a} index={i} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Beynəlxalq tərəfdaşlıqlar */}
          {data.partners.length > 0 && (
            <section className="section section--tint">
              <div className="container">
                <SectionHead
                  eyebrow="Əməkdaşlıq"
                  title="Beynəlxalq"
                  accent="Tərəfdaşlıqlar"
                  description="Dünyanın müxtəlif ölkələrindən etibarlı tərəfdaşlarımız."
                />
              </div>
              <PartnersMarquee partners={data.partners} />
            </section>
          )}
        </>
      ) : null}
    </>
  );
}
