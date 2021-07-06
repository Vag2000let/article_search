import {createAction, createReducer, createSlice, createSelector, createDraftSafeSelector} from "@reduxjs/toolkit";
import {CREATE_TEXT} from "../redux/types";


// const initialState = {
//     texts: []
// }

const texts = createAction(CREATE_TEXT)

// export default createReducer(initialState, {
//     [texts]: (state, action) => {
//         state.texts = action.payload
//         return state
//     }
// })
const textsState = (state) => state.texts
// const unsafeSelector = createSelector(textsState, (state) => state.value)
const draftSafeSelector = createDraftSafeSelector(textsState, (state) => state.value)
const textsSlice = createSlice({
    name: 'createText',
    initialState: {
        texts: draftSafeSelector
    },
    extraReducers: (builder) => {
        builder
            .addCase(texts, (state, action) => {
                state.texts = action.payload
            })
    }
})
export default textsSlice.reducer