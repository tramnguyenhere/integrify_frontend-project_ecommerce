import { configureStore } from "@reduxjs/toolkit";

import productsReducer from '../redux/reducers/productsReducer'
import reviewReducer from "./reducers/reviewReducer";

const store = configureStore({
    reducer: {
        products: productsReducer,
        reviews: reviewReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store