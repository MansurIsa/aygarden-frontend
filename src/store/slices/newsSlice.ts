import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage } from "@/lib/api";
import type { NewsDetail, NewsItem, Paginated, Status } from "@/types";

interface NewsState {
  items: NewsItem[];
  totalPages: number;
  page: number;
  status: Status;
  detail: NewsDetail | null;
  detailStatus: Status;
}

const initialState: NewsState = {
  items: [],
  totalPages: 1,
  page: 1,
  status: "idle",
  detail: null,
  detailStatus: "idle",
};

export const fetchNews = createAsyncThunk<Paginated<NewsItem>, number, { rejectValue: string }>(
  "news/list",
  async (page, { rejectWithValue }) => {
    try {
      return await endpoints.news({ page, page_size: 9 });
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

export const fetchNewsDetail = createAsyncThunk<NewsDetail, string, { rejectValue: string }>(
  "news/detail",
  async (slug, { rejectWithValue }) => {
    try {
      return await endpoints.newsDetail(slug);
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchNews.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchNews.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload.results;
        s.totalPages = a.payload.total_pages;
        s.page = a.payload.current_page;
      })
      .addCase(fetchNews.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(fetchNewsDetail.pending, (s) => {
        s.detailStatus = "loading";
        s.detail = null;
      })
      .addCase(fetchNewsDetail.fulfilled, (s, a) => {
        s.detailStatus = "succeeded";
        s.detail = a.payload;
      })
      .addCase(fetchNewsDetail.rejected, (s) => {
        s.detailStatus = "failed";
      });
  },
});

export default newsSlice.reducer;
