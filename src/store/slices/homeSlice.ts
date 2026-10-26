import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "@/lib/api";
import type { HeroSlide, NewsItem, Partner, Product, Statistic, Status } from "@/types";

interface HomeState {
  slides: HeroSlide[];
  statistics: Statistic[];
  featured: Product[];
  latestNews: NewsItem[];
  partners: Partner[];
  status: Status;
}

const initialState: HomeState = {
  slides: [],
  statistics: [],
  featured: [],
  latestNews: [],
  partners: [],
  status: "idle",
};

/** Ana səhifənin bütün bölmələri paralel yüklənir; biri xəta versə də, digərləri göstərilir. */
export const fetchHome = createAsyncThunk("home/fetch", async () => {
  const [slides, statistics, featured, news, about] = await Promise.allSettled([
    endpoints.slides(),
    endpoints.statistics(),
    endpoints.products({ featured: true, page_size: 8 }),
    endpoints.news({ page_size: 3 }),
    endpoints.about(),
  ]);
  const ok = <T,>(r: PromiseSettledResult<T>): T | undefined =>
    r.status === "fulfilled" ? r.value : undefined;
  return {
    slides: ok(slides) ?? [],
    statistics: ok(statistics) ?? [],
    featured: ok(featured)?.results ?? [],
    latestNews: ok(news)?.results ?? [],
    partners: ok(about)?.partners ?? [],
  };
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchHome.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchHome.fulfilled, (s, a) => {
        Object.assign(s, a.payload);
        s.status = "succeeded";
      })
      .addCase(fetchHome.rejected, (s) => {
        s.status = "failed";
      });
  },
});

export default homeSlice.reducer;
