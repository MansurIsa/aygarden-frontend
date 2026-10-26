import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  applyModalOpen: boolean;
}

const initialState: UiState = { applyModalOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openApplyModal: (s) => {
      s.applyModalOpen = true;
    },
    closeApplyModal: (s) => {
      s.applyModalOpen = false;
    },
  },
});

export const { openApplyModal, closeApplyModal } = uiSlice.actions;
export default uiSlice.reducer;
