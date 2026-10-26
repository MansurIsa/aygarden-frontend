"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaLeaf } from "react-icons/fa6";
import { HERO_FALLBACK, imageOr } from "@/lib/images";
import { useAppDispatch } from "@/store/hooks";
import { openApplyModal } from "@/store/slices/uiSlice";
import type { HeroSlide } from "@/types";
import SocialLinks from "../SocialLinks";

const DEFAULT_SLIDE: HeroSlide = {
  id: 0,
  badge: "Təzə · Təbii · Keyfiyyətli",
  title: "Təbiətin ən təzə nemətləri süfrənizdə",
  subtitle: "Azərbaycanın münbit bağlarından seçilmiş meyvələr.",
  image: HERO_FALLBACK,
  button_text: "Müraciət et",
  secondary_button_text: "Məhsullar",
  secondary_button_link: "/mehsullar",
};

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const items = slides.length ? slides : [DEFAULT_SLIDE];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dispatch = useAppDispatch();

  const go = useCallback((i: number) => setActive((i + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const t = setTimeout(() => go(active + 1), 6500);
    return () => clearTimeout(t);
  }, [active, paused, items.length, go]);

  return (
    <section className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {items.map((s, i) => (
        <div key={s.id} className={`hero__slide ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
          <div className="hero__bg" style={{ backgroundImage: `url(${imageOr(s.image, i)})` }} />
          <div className="hero__overlay" />
          <div className="floaters" aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="container hero__content">
            {s.badge ? (
              <span className="hero__badge">
                <FaLeaf /> {s.badge}
              </span>
            ) : (
              <span />
            )}
            {i === 0 ? <h1 className="hero__title">{s.title}</h1> : <h2 className="hero__title">{s.title}</h2>}
            <p className="hero__subtitle">{s.subtitle}</p>
            <div className="hero__buttons">
              <button className="btn btn--primary" onClick={() => dispatch(openApplyModal())}>
                {s.button_text || "Müraciət et"} <FaArrowRight />
              </button>
              {s.secondary_button_text && (
                <Link href={s.secondary_button_link || "/mehsullar"} className="btn btn--ghost">
                  {s.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="hero__social">
        <SocialLinks column />
      </div>

      {items.length > 1 && (
        <div className="hero__controls">
          <div className="container">
            <div className="hero__dots">
              {items.map((s, i) => (
                <button
                  key={s.id}
                  className={`hero__dot ${i === active ? "is-active" : ""}`}
                  onClick={() => go(i)}
                  aria-label={`Slayd ${i + 1}`}
                />
              ))}
            </div>
            <div className="hero__arrows">
              <button className="hero__arrow" onClick={() => go(active - 1)} aria-label="Əvvəlki">
                <FaChevronLeft />
              </button>
              <button className="hero__arrow" onClick={() => go(active + 1)} aria-label="Növbəti">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
