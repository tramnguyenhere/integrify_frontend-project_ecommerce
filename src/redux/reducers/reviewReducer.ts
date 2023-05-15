import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Review } from "../../types/Review";

const initialState: {reviews: Review[]} = {
    reviews: []
}

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        appendReview(state, action: PayloadAction<Review>) {
            state.reviews.push(action.payload)
        }
    }
})

const reviewReducer = reviewSlice.reducer

export const { appendReview } = reviewSlice.actions
export default reviewReducer