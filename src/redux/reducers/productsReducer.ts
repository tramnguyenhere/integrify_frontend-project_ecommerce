import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import axios, {AxiosError} from "axios";

const initialState: {
    products: Product[],
    loading: boolean,
    error: string
} = {
    products: [],
    loading: false,
    error: ""
}

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async () => {
        try {
            const result = await axios.get<Product[]>("https://api.escuelajs.co/api/v1/products")
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
    }
})

const productsReducer = productsSlice.reducer

export default productsReducer