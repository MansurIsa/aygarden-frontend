import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import homeReducer from "./slices/homeSlice";
import catalogReducer from "./slices/catalogSlice";
import newsReducer from "./slices/newsSlice";
import aboutReducer from "./slices/aboutSlice";
import searchReducer from "./slices/searchSlice";
import contactReducer from "./slices/contactSlice";
import uiReducer from "./slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      home: homeReducer,
      catalog: catalogReducer,
      news: newsReducer,
      about: aboutReducer,
      search: searchReducer,
      contact: contactReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
