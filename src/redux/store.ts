import { configureStore } from "@reduxjs/toolkit";

import productsReducer from '../redux/reducers/productsReducer'
import reviewReducer from "./reducers/reviewReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        reviewReducer
    },
    preloadedState: {
        productsReducer: {
            loading: false,
            error: "",
            products: []
        },
       
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store