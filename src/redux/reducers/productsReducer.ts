import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { ProductUpdate } from "../../types/ProductUpdate";
import { NewProduct } from "../../types/NewProduct";

const baseUrl = "https://api.escuelajs.co/api/v1/products";

const initialState: {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string;
} = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: "",
};

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    try {
      const result = await axios.get<Product[]>(baseUrl);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
export const fetchSingleProductById = createAsyncThunk(
  "fetchSingleProductById",
  async (productId: number) => {
    try {
      const result = await axios.get<Product>(`${baseUrl}/${productId}`);
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "createNewProduct",
  async (product: NewProduct) => {
    try {
      const createProductResponse = await axios.post(baseUrl, product);
      return createProductResponse.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const updateSingleProduct = createAsyncThunk(
  "updateSingleProduct",
  async (updatedProduct: ProductUpdate) => {
    try {
      const result = await axios.put(
        `${baseUrl}/${updatedProduct.id}`,
        updatedProduct.update
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "deleteSingleProduct",
  async (productId: number) => {
    try {
      const result = await axios.delete(`${baseUrl}/${productId}`);
      return { response: result.data, id: productId };
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.products = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = "Cannot fetch data";
      })
      .addCase(fetchSingleProductById.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.filteredProducts.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchSingleProductById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleProductById.rejected, (state, action) => {
        state.error = "Cannot fetch data";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.products.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(createNewProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.error = "Cannot create new product";
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          const products = state.products.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, ...action.payload };
            }
            return product;
          });
          state.products = products;
        }
        state.loading = false;
      })
      .addCase(updateSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSingleProduct.rejected, (state) => {
        state.error = "Cannot update product";
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          const deletedProductId = action.payload.id;

          state.products = state.products.filter(
            (product) => product.id !== deletedProductId
          );
        }
        state.loading = false;
      })
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSingleProduct.rejected, (state) => {
        state.error = "Cannot update product";
      });
  },
});

export const { setFilteredProducts } = productsSlice.actions;

const productsReducer = productsSlice.reducer;

export default productsReducer;
