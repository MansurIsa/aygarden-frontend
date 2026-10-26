"use client";

import type { ReactNode } from "react";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SocialLinks from "@/components/SocialLinks";
import { PageHero } from "@/components/ui";
import { FRUIT_IMAGES } from "@/lib/images";
import { useAppSelector } from "@/store/hooks";

export default function ContactView() {
  const s = useAppSelector((st) => st.settings.data);

  const items = [
    s?.phone && {
      icon: <FaPhone />,
      label: "Telefon",
      value: (
        <>
          <a href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a>
          {s.phone_secondary && (
            <>
              <br />
              <a href={`tel:${s.phone_secondary.replace(/\s/g, "")}`}>{s.phone_secondary}</a>
            </>
          )}
        </>
      ),
    },
    s?.email && { icon: <FaEnvelope />, label: "E-poçt", value: <a href={`mailto:${s.email}`}>{s.email}</a> },
    s?.address && { icon: <FaLocationDot />, label: "Ünvan", value: <strong>{s.address}</strong> },
    s?.working_hours && { icon: <FaClock />, label: "İş saatları", value: <strong>{s.working_hours}</strong> },
  ].filter(Boolean) as { icon: ReactNode; label: string; value: ReactNode }[];

  return (
    <>
      <PageHero
        title="Əlaqə"
        description="Suallarınız və sifarişləriniz üçün bizimlə əlaqə saxlayın"
        crumbs={[{ label: "Əlaqə" }]}
        image={FRUIT_IMAGES[0]}
      />
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <Reveal>
                <span className="eyebrow">Bizimlə əlaqə</span>
                <h2 className="section-title">
                  Sizi <span className="accent">dinləməyə</span> hazırıq
                </h2>
              </Reveal>
              {items.map((it, i) => (
                <Reveal key={it.label} delay={i * 100} className="contact-item">
                  <span className="contact-item__icon">{it.icon}</span>
                  <div>
                    <small>{it.label}</small>
                    {it.value}
                  </div>
                </Reveal>
              ))}
              <Reveal delay={400}>
                <SocialLinks variant="dark" />
              </Reveal>
            </div>

            <Reveal variant="right" className="form-card">
              <h3>Mesaj göndərin</h3>
              <p style={{ color: "var(--text-muted)" }}>Formu doldurun, ən qısa zamanda cavab verəcəyik.</p>
              <ContactForm source="contact" />
            </Reveal>
          </div>

          {s?.map_embed_url && (
            <Reveal className="map">
              <iframe src={s.map_embed_url} loading="lazy" title="Xəritə" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
