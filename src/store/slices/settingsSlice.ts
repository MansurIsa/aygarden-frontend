import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage } from "@/lib/api";
import type { SiteSettings, Status } from "@/types";

interface SettingsState {
  data: SiteSettings | null;
  status: Status;
  error: string | null;
}

const initialState: SettingsState = { data: null, status: "idle", error: null };

export const fetchSettings = createAsyncThunk<SiteSettings, void, { rejectValue: string }>(
  "settings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await endpoints.settings();
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
  {
    condition: (_, { getState }) =>
      (getState() as { settings: SettingsState }).settings.status === "idle",
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSettings.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchSettings.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.data = a.payload;
      })
      .addCase(fetchSettings.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload ?? "Xəta";
      });
  },
});

export default settingsSlice.reducer;
