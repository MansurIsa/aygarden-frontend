# aygarden.az — Frontend

Next.js 16 (App Router) · React 19 · TypeScript · Redux Toolkit · Axios

## İşə salma

```bash
npm install
copy .env.example .env.local    # Linux/Mac: cp .env.example .env.local
npm run dev                     # http://localhost:3000
```

Backend (`http://127.0.0.1:8000`) işləməlidir. API ünvanı `.env.local` → `NEXT_PUBLIC_API_URL`.

Production: `npm run build && npm start`

## Struktur

```
src/
  app/               səhifələr (/, /haqqimizda, /mehsullar, /mehsullar/[slug],
                     /xeberler, /xeberler/[slug], /elaqe, /axtaris)
  views/             səhifələrin client komponentləri
  components/        Header (axtarış), Footer, kartlar, modal, slider, statistika...
  store/             Redux Toolkit store + slice-lar (settings, home, catalog,
                     news, about, search, contact, ui)
  lib/api.ts         axios instance və bütün endpoint-lər
  lib/images.ts      şəkil yüklənməyibsə göstərilən meyvə şəkilləri
  app/globals.css    dizayn sistemi (rənglər loqodan), animasiyalar, responsive
```

Loqo, favicon, telefon, e-poçt, sosial şəbəkələr `/api/settings/`-dən gəlir.
Admin paneldə dəyişdikdə saytda avtomatik yenilənir.
