import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage } from "@/lib/api";
import type { SearchResult, Status } from "@/types";

interface SearchState {
  query: string;
  results: SearchResult | null;
  status: Status;
}

const initialState: SearchState = { query: "", results: null, status: "idle" };

export const runSearch = createAsyncThunk<SearchResult, string, { rejectValue: string }>(
  "search/run",
  async (q, { rejectWithValue }) => {
    try {
      return await endpoints.search(q);
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(runSearch.pending, (s, a) => {
      s.status = "loading";
      s.query = a.meta.arg;
    })
      .addCase(runSearch.fulfilled, (s, a) => {
        // köhnə sorğunun cavabı yenisini əvəz etməsin
        if (a.meta.arg !== s.query) return;
        s.status = "succeeded";
        s.results = a.payload;
      })
      .addCase(runSearch.rejected, (s) => {
        s.status = "failed";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
