"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaChevronRight, FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/store/slices/catalogSlice";
import { NAV_LINKS } from "./Header";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const dispatch = useAppDispatch();
  const s = useAppSelector((st) => st.settings.data);
  const categories = useAppSelector((st) => st.catalog.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link href="/" className="footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s?.logo_footer || s?.logo || "/logo.png"} alt="aygarden.az" />
          </Link>
          <p>{s?.footer_text}</p>
          <SocialLinks />
        </div>

        <div>
          <h4>Keçidlər</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <FaChevronRight size={10} /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Kateqoriyalar</h4>
          <ul>
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link href={`/mehsullar?kateqoriya=${c.slug}`}>
                  <FaChevronRight size={10} /> {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Əlaqə</h4>
          <ul className="footer__contact">
            {s?.address && (
              <li>
                <FaLocationDot /> {s.address}
              </li>
            )}
            {s?.phone && (
              <li>
                <FaPhone />
                <span>
                  <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>
                  {s.phone_secondary && (
                    <>
                      <br />
                      <a href={`tel:${s.phone_secondary.replace(/\s/g, "")}`}>{s.phone_secondary}</a>
                    </>
                  )}
                </span>
              </li>
            )}
            {s?.email && (
              <li>
                <FaEnvelope /> <a href={`mailto:${s.email}`}>{s.email}</a>
              </li>
            )}
            {s?.working_hours && (
              <li>
                <FaClock /> {s.working_hours}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>
            © {year} {s?.site_name || "aygarden.az"}. Bütün hüquqlar qorunur.
          </span>
          <span>{s?.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
