"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaChevronRight, FaEnvelope, FaLocationDot, FaPhone, FaXmark } from "react-icons/fa6";
import { useAppSelector } from "@/store/hooks";
import SearchBox from "./SearchBox";
import SocialLinks from "./SocialLinks";

export const NAV_LINKS = [
  { href: "/", label: "Ana səhifə" },
  { href: "/haqqimizda", label: "Haqqımızda" },
  { href: "/mehsullar", label: "Məhsullar" },
  { href: "/xeberler", label: "Xəbərlər" },
  { href: "/elaqe", label: "Əlaqə" },
];

export default function Header() {
  const pathname = usePathname();
  const settings = useAppSelector((s) => s.settings.data);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const logo = settings?.logo || "/logo.png";
  // Ana səhifədə header şəffaf başlayır, digər səhifələrdə də banner olduğu üçün eyni davranış
  const solid = pathname === "/axtaris";

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""} ${solid ? "is-solid" : ""}`}>
        <div className="container header__inner">
          <Link href="/" className="header__logo" aria-label="Ana səhifə">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt={settings?.site_name || "aygarden.az"} />
          </Link>

          <nav className="nav" aria-label="Əsas menyu">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`nav__link ${isActive(l.href) ? "is-active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <SearchBox />
            {settings?.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="header__phone">
                <span className="icon">
                  <FaPhone />
                </span>
                {settings.phone}
              </a>
            )}
            <button className="icon-btn burger" onClick={() => setMenuOpen(true)} aria-label="Menyunu aç">
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer-backdrop ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer__top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="aygarden.az" />
          <button
            className="icon-btn"
            style={{ background: "var(--surface-2)", color: "var(--green-800)" }}
            onClick={() => setMenuOpen(false)}
            aria-label="Menyunu bağla"
          >
            <FaXmark />
          </button>
        </div>
        <nav className="drawer__nav">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "is-active" : ""}>
              {l.label}
              <FaChevronRight size={14} />
            </Link>
          ))}
        </nav>
        {settings && (
          <div className="drawer__contact">
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                <FaPhone /> {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`}>
                <FaEnvelope /> {settings.email}
              </a>
            )}
            {settings.address && (
              <a>
                <FaLocationDot /> {settings.address}
              </a>
            )}
          </div>
        )}
        <SocialLinks variant="dark" />
      </aside>
    </>
  );
}
