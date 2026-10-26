"use client";

import { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa6";
import { useAppSelector } from "@/store/hooks";

export default function FloatingButtons() {
  const whatsapp = useAppSelector((s) => s.settings.data?.whatsapp);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        className={`fab fab--top ${showTop ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Yuxarı qalx"
      >
        <FaArrowUp />
      </button>
      {whatsapp && (
        <a
          className="fab fab--whatsapp"
          href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ilə yaz"
        >
          <FaWhatsapp />
        </a>
      )}
    </>
  );
}
