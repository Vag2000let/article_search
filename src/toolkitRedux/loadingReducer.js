import {SHOW_LOADING, HIDE_LOADING} from "../redux/types";
import {createAction, createReducer} from "@reduxjs/toolkit";


const initialState = {
    loading: false
}

const showLoading = createAction(SHOW_LOADING)
const hideLoading = createAction(HIDE_LOADING)

export default createReducer(initialState, {
    [hideLoading]: (state, action) => {
        state.loading = action.payload
        return state
    },
    [showLoading]: (state, action) => {
        state.loading = action.payload
        return state
    }
    },
)
