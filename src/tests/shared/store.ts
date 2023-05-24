import { configureStore } from "@reduxjs/toolkit"

import productsReducer from "../../redux/reducers/productsReducer"
import usersReducer from "../../redux/reducers/usersReducer"

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
    }
})

export default store