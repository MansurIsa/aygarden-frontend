import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints, errorMessage, type ProductQuery } from "@/lib/api";
import type { Category, Paginated, Product, ProductDetail, Status } from "@/types";

interface CatalogState {
  categories: Category[];
  categoriesStatus: Status;
  products: Product[];
  count: number;
  totalPages: number;
  page: number;
  productsStatus: Status;
  detail: ProductDetail | null;
  detailStatus: Status;
  error: string | null;
}

const initialState: CatalogState = {
  categories: [],
  categoriesStatus: "idle",
  products: [],
  count: 0,
  totalPages: 1,
  page: 1,
  productsStatus: "idle",
  detail: null,
  detailStatus: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  "catalog/categories",
  async (_, { rejectWithValue }) => {
    try {
      return await endpoints.categories();
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
  {
    condition: (_, { getState }) => {
      const st = (getState() as { catalog: CatalogState }).catalog.categoriesStatus;
      return st === "idle" || st === "failed";
    },
  },
);

export const fetchProducts = createAsyncThunk<Paginated<Product>, ProductQuery, { rejectValue: string }>(
  "catalog/products",
  async (query, { rejectWithValue }) => {
    try {
      return await endpoints.products(query);
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

export const fetchProduct = createAsyncThunk<ProductDetail, string, { rejectValue: string }>(
  "catalog/product",
  async (slug, { rejectWithValue }) => {
    try {
      return await endpoints.product(slug);
    } catch (e) {
      return rejectWithValue(errorMessage(e));
    }
  },
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s) => {
      s.categoriesStatus = "loading";
    })
      .addCase(fetchCategories.fulfilled, (s, a) => {
        s.categoriesStatus = "succeeded";
        s.categories = a.payload;
      })
      .addCase(fetchCategories.rejected, (s) => {
        s.categoriesStatus = "failed";
      })
      .addCase(fetchProducts.pending, (s) => {
        s.productsStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.productsStatus = "succeeded";
        s.products = a.payload.results;
        s.count = a.payload.count;
        s.totalPages = a.payload.total_pages;
        s.page = a.payload.current_page;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.productsStatus = "failed";
        s.error = a.payload ?? null;
      })
      .addCase(fetchProduct.pending, (s) => {
        s.detailStatus = "loading";
        s.detail = null;
      })
      .addCase(fetchProduct.fulfilled, (s, a) => {
        s.detailStatus = "succeeded";
        s.detail = a.payload;
      })
      .addCase(fetchProduct.rejected, (s, a) => {
        s.detailStatus = "failed";
        s.error = a.payload ?? null;
      });
  },
});

export default catalogSlice.reducer;
