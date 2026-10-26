import axios, { AxiosError } from "axios";
import type {
  AboutPage,
  Category,
  ContactPayload,
  HeroSlide,
  NewsDetail,
  NewsItem,
  Paginated,
  Product,
  ProductDetail,
  SearchResult,
  SiteSettings,
  Statistic,
} from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export interface ProductQuery {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  page_size?: number;
}

/** Bütün backend endpoint-ləri bir yerdə */
export const endpoints = {
  settings: () => api.get<SiteSettings>("/settings/").then((r) => r.data),
  slides: () => api.get<HeroSlide[]>("/slides/").then((r) => r.data),
  statistics: () => api.get<Statistic[]>("/statistics/").then((r) => r.data),
  about: () => api.get<AboutPage>("/about/").then((r) => r.data),
  categories: () => api.get<Category[]>("/categories/").then((r) => r.data),
  products: (params: ProductQuery = {}) =>
    api.get<Paginated<Product>>("/products/", { params }).then((r) => r.data),
  product: (slug: string) => api.get<ProductDetail>(`/products/${slug}/`).then((r) => r.data),
  news: (params: { page?: number; page_size?: number } = {}) =>
    api.get<Paginated<NewsItem>>("/news/", { params }).then((r) => r.data),
  newsDetail: (slug: string) => api.get<NewsDetail>(`/news/${slug}/`).then((r) => r.data),
  search: (q: string) => api.get<SearchResult>("/search/", { params: { q } }).then((r) => r.data),
  contact: (payload: ContactPayload) =>
    api.post<{ detail: string }>("/contact/", payload).then((r) => r.data),
};

/** Axios xətasından istifadəçiyə göstəriləcək mesaj */
export function errorMessage(err: unknown): string {
  const e = err as AxiosError<Record<string, unknown>>;
  const data = e?.response?.data;
  if (data && typeof data === "object") {
    if (typeof data.detail === "string") return data.detail;
    const first = Object.values(data)[0];
    if (Array.isArray(first) && typeof first[0] === "string") return first[0];
    if (typeof first === "string") return first;
  }
  if (e?.code === "ERR_NETWORK") return "Serverlə əlaqə qurulmadı. Bir az sonra yenidən cəhd edin.";
  return "Xəta baş verdi. Yenidən cəhd edin.";
}
