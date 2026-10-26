import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage } from "@/lib/api";
import type { ContactPayload, Status } from "@/types";

interface ContactState {
  status: Status;
  message: string | null;
}

const initialState: ContactState = { status: "idle", message: null };

export const sendContact = createAsyncThunk<string, ContactPayload, { rejectValue: string }>(
  "contact/send",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await endpoints.contact(payload);
      return res.detail;
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContact: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(sendContact.pending, (s) => {
      s.status = "loading";
      s.message = null;
    })
      .addCase(sendContact.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.message = a.payload;
      })
      .addCase(sendContact.rejected, (s, a) => {
        s.status = "failed";
        s.message = a.payload ?? "Xəta baş verdi.";
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
