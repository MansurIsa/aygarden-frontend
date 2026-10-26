"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { useAppSelector } from "@/store/hooks";

interface Props {
  variant?: "light" | "dark";
  column?: boolean;
}

export default function SocialLinks({ variant = "light", column = false }: Props) {
  const s = useAppSelector((st) => st.settings.data);
  if (!s) return null;

  const links = [
    { href: s.facebook, icon: <FaFacebookF />, label: "Facebook" },
    { href: s.instagram, icon: <FaInstagram />, label: "Instagram" },
    { href: s.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
    { href: s.youtube, icon: <FaYoutube />, label: "YouTube" },
    { href: s.tiktok, icon: <FaTiktok />, label: "TikTok" },
    { href: s.telegram, icon: <FaTelegram />, label: "Telegram" },
    { href: s.whatsapp ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}` : "", icon: <FaWhatsapp />, label: "WhatsApp" },
  ].filter((l) => l.href);

  return (
    <div className={`social ${variant === "dark" ? "social--dark" : ""} ${column ? "social--column" : ""}`}>
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
          {l.icon}
        </a>
      ))}
    </div>
  );
}
