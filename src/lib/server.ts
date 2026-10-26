import { API_URL } from "./api";

/** Server tərəfdə (metadata üçün) API sorğusu; xəta olarsa null qaytarır. */
export async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
