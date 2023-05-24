import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../../redux/reducers/productsReducer"
import usersReducer from "../../redux/reducers/usersReducer"
import reviewReducer from "../../redux/reducers/reviewReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        reviewReducer,
    }
})

export default store