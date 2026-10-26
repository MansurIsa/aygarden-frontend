export type IconName =
  | "leaf" | "apple" | "users" | "box" | "truck" | "globe" | "award" | "shield"
  | "heart" | "handshake" | "sun" | "star" | "clock" | "warehouse" | "seedling" | "smile";

export interface SiteSettings {
  site_name: string;
  slogan: string;
  logo: string | null;
  logo_footer: string | null;
  favicon: string | null;
  phone: string;
  phone_secondary: string;
  whatsapp: string;
  email: string;
  address: string;
  working_hours: string;
  map_embed_url: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  telegram: string;
  footer_text: string;
  meta_description: string;
  meta_keywords: string;
}

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string | null;
  button_text: string;
  secondary_button_text: string;
  secondary_button_link: string;
}

export interface Statistic {
  id: number;
  title: string;
  value: number;
  suffix: string;
  icon: IconName;
}

export interface IconItem {
  id: number;
  title: string;
  description: string;
  icon: IconName;
}

export interface Partner {
  id: number;
  name: string;
  country: string;
  logo: string | null;
  website: string;
  description: string;
}

export interface AboutPage {
  title: string;
  subtitle: string;
  content: string;
  image: string | null;
  image_secondary: string | null;
  experience_years: number;
  vision: string;
  mission: string;
  values: IconItem[];
  advantages: IconItem[];
  partners: Partner[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  product_count: number;
}

export interface CategoryMini {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  image: string | null;
  origin: string;
  season: string;
  packaging: string;
  is_featured: boolean;
  category: CategoryMini;
}

export interface ProductDetail extends Product {
  description: string;
  gallery: { id: number; image: string }[];
  related: Product[];
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  published_at: string;
}

export interface NewsDetail extends NewsItem {
  content: string;
  latest: NewsItem[];
}

export interface Paginated<T> {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SearchResult {
  query: string;
  products: Product[];
  categories: Category[];
  news: NewsItem[];
}

export interface ContactPayload {
  full_name: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  source?: "contact" | "banner" | "product";
}

export type Status = "idle" | "loading" | "succeeded" | "failed";
