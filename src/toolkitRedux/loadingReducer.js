// import {SHOW_LOADING, HIDE_LOADING} from "../redux/types";
import {createSlice} from "@reduxjs/toolkit";


// const initialState = {
//     loading: false
// }

// const showLoading = createAction(SHOW_LOADING)
// const hideLoading = createAction(HIDE_LOADING)

// export default createReducer(initialState, {
//     [hideLoading]: (state, action) => {
//         state.loading = action.payload
//         return state
//     },
//     [showLoading]: (state, action) => {
//         state.loading = action.payload
//         return state
//     }
//     },
// )


const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state, action) => {
            state.loading = action.payload
        },
        hideLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export default loadingSlice.reducer;
export const {showLoading, hideLoading} = loadingSlice.actions;