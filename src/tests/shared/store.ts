import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../../redux/reducers/productsReducer"
import usersReducer from "../../redux/reducers/usersReducer"
import reviewReducer from "../../redux/reducers/reviewReducer"
import categoriesReducer from "../../redux/reducers/categoriesReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        reviewReducer,
        categoriesReducer
    }
})

export default store