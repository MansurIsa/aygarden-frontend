"use client";

import { useEffect, useRef, useState } from "react";
import type { Statistic } from "@/types";
import Icon from "../Icon";
import Reveal from "../Reveal";

function CountUp({ to, duration = 2000 }: { to: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setValue(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return <span ref={ref}>{value.toLocaleString("az-AZ")}</span>;
}

export default function StatsSection({ items, overlap = true }: { items: Statistic[]; overlap?: boolean }) {
  if (!items.length) return null;
  return (
    <section className={overlap ? "stats" : "section"} style={overlap ? undefined : { paddingBottom: 0 }}>
      <div className="container">
        <Reveal className="stats__grid">
          {items.map((s) => (
            <div key={s.id} className="stat">
              <div className="stat__icon">
                <Icon name={s.icon} />
              </div>
              <div>
                <div className="stat__value">
                  <CountUp to={s.value} />
                  {s.suffix}
                </div>
                <div className="stat__label">{s.title}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
