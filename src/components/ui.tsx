import Link from "next/link";
import type { ReactNode } from "react";
import { FaChevronLeft, FaChevronRight, FaLeaf } from "react-icons/fa6";
import { PAGE_HERO_IMAGE } from "@/lib/images";
import Reveal from "./Reveal";

export function PageHero({
  title,
  description,
  crumbs = [],
  image,
}: {
  title: string;
  description?: string;
  crumbs?: { href?: string; label: string }[];
  image?: string | null;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" style={{ backgroundImage: `url(${image || PAGE_HERO_IMAGE})` }} />
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <Link href="/">Ana səhifə</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: "contents" }}>
              <FaChevronRight size={10} />
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <svg className="page-hero__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 60V30c240-40 480-40 720 0s480 40 720 0v30z" />
      </svg>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={`section-head ${align === "left" ? "section-head--left" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {description && <p className="section-desc">{description}</p>}
    </Reveal>
  );
}

export function SkeletonGrid({ count = 4, height = 380, cols = 4 }: { count?: number; height?: number; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`grid grid--${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height }} />
      ))}
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="empty">
      <div className="empty__icon">
        <FaLeaf />
      </div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Əvvəlki">
        <FaChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} className={p === page ? "is-active" : ""} onClick={() => onChange(p)}>
          {p}
        </button>
      ))}
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} aria-label="Növbəti">
        <FaChevronRight />
      </button>
    </div>
  );
}
