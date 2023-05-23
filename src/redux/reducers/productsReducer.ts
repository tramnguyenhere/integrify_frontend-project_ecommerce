import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";

const baseUrl = 'https://api.escuelajs.co/api/v1/products'

const initialState: {
    products: Product[],
    filteredProducts: Product[],
    loading: boolean,
    error: string
} = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: ""
}

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async () => {
        try {
            const result = await axios.get<Product[]>(baseUrl)
            return result.data
        } catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const fetchSingleProductById = createAsyncThunk(
    "fetchSingleProductById",
    async (productId: number) => {
        try {
            const result = await axios.get<Product>(`${baseUrl}/${productId}`)
            return result.data
        } catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
            state.filteredProducts = action.payload
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
           
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.products = action.payload
                }
                state.loading = false
            })
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(fetchSingleProductById.fulfilled, (state, action) => {
           
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.filteredProducts.push(action.payload)
                }
                state.loading = false
            })
            .addCase(fetchSingleProductById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchSingleProductById.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
    }
})

export const {setFilteredProducts} = productsSlice.actions

const productsReducer = productsSlice.reducer

export default productsReducer