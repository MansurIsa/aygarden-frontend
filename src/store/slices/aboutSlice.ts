import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage } from "@/lib/api";
import type { AboutPage, Statistic, Status } from "@/types";

interface AboutState {
  data: AboutPage | null;
  statistics: Statistic[];
  status: Status;
}

const initialState: AboutState = { data: null, statistics: [], status: "idle" };

export const fetchAbout = createAsyncThunk<
  { data: AboutPage; statistics: Statistic[] },
  void,
  { rejectValue: string }
>("about/fetch", async (_, { rejectWithValue }) => {
  try {
    const [data, statistics] = await Promise.all([endpoints.about(), endpoints.statistics()]);
    return { data, statistics };
  } catch (e) {
    return rejectWithValue(errorMessage(e));
  }
});

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchAbout.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchAbout.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.data = a.payload.data;
        s.statistics = a.payload.statistics;
      })
      .addCase(fetchAbout.rejected, (s) => {
        s.status = "failed";
      });
  },
});

export default aboutSlice.reducer;
