/**
 * Admin paneldə şəkil yüklənməyibsə göstəriləcək meyvə şəkilləri (Unsplash).
 */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=crop`;

export const FRUIT_IMAGES = [
  u("1619566636858-adf3ef46400b"), // səbət
  u("1610832958506-aa56368176cf"), // tropik qarışıq
  u("1490474418585-ba9bad8fd0ea"), // meyvə boşqabı
  u("1560806887-1e4cd0b6cbd6"), // alma
  u("1546548970-71785318a17b"), // sitrus
  u("1464965911861-746a04b4bca6"), // çiyələk
  u("1537640538966-79f369143f8f"), // üzüm
  u("1601493700631-2b16ec4b4716"), // manqo
  u("1519996529931-28324d5a630e"), // meyvə qabı
  u("1563114773-84221bd62daa"), // qarpız
];

export const HERO_FALLBACK = u("1619566636858-adf3ef46400b", 1920);
export const PAGE_HERO_IMAGE = u("1488459716781-31db52582fe9", 1920);

export function imageOr(src: string | null | undefined, seed = 0): string {
  if (src) return src;
  return FRUIT_IMAGES[Math.abs(seed) % FRUIT_IMAGES.length];
}

export function formatDate(iso: string): string {
  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
  ];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
