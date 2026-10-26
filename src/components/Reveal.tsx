"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: ElementType;
  variant?: "up" | "left" | "right" | "zoom";
  delay?: number;
  className?: string;
}

/** Element ekrana daxil olanda animasiya ilə görünür. */
export default function Reveal({ children, as: Tag = "div", variant = "up", delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = variant === "up" ? "" : ` reveal--${variant}`;
  return (
    <Tag
      ref={ref}
      className={`reveal${variantClass} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
