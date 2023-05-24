import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Category } from "../../types/Category";

const baseUrl = "https://api.escuelajs.co/api/v1/categories";

const initialState: {
  categories: Category[];
  selectedCategoryId: number;
  loading: boolean;
  error: string;
} = {
  categories: [],
  selectedCategoryId: 0,
  loading: false,
  error: "",
};

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
    try {
      const result = await axios.get<Category[]>(baseUrl);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategoryId = action.payload;
    }
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.categories = [
            {
              id: 0,
              name: "All",
              image: "",
            },
            ...action.payload,
          ];
        }
        state.loading = false;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.error = "Cannot fetch data";
      })
  },
});

export const { setCategory } = categoriesSlice.actions;

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
