import type { Partner } from "@/types";

function PartnerCard({ p }: { p: Partner }) {
  const inner = (
    <>
      <div className="partner-card__logo">
        {p.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt={p.name} />
        ) : (
          p.name.charAt(0)
        )}
      </div>
      <div>
        <strong>{p.name}</strong>
        <span>{p.country}</span>
      </div>
    </>
  );
  return p.website ? (
    <a href={p.website} target="_blank" rel="noopener noreferrer" className="partner-card" title={p.description}>
      {inner}
    </a>
  ) : (
    <div className="partner-card" title={p.description}>
      {inner}
    </div>
  );
}

/** Sonsuz sürüşən tərəfdaşlar zolağı */
export default function PartnersMarquee({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;
  const loop = [...partners, ...partners];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {loop.map((p, i) => (
          <PartnerCard key={`${p.id}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}
