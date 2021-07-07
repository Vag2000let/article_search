import {createSlice} from "@reduxjs/toolkit";
import {draftSafeSelector} from "../redux/selectors/textsSelector";

// const initialState = {
//     texts: []
// }

// const textsAction = createAction(CREATE_TEXT)

// export default createReducer(initialState, {
//     [texts]: (state, action) => {
//         state.texts = action.payload
//         return state
//     }
// })
// const unsafeSelector = createSelector(textsState, (state) => state.value)
const textsSlice = createSlice({
    name: 'createText',
    initialState: {
        texts: draftSafeSelector
    },
    reducers: {
        texts: (state, action) => {
            state.texts = action.payload;
        },
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(textsAction, (state, action) => {
    //             state.texts = action.payload
    //         })
    // }
})
export default textsSlice.reducer;
export const {texts} = textsSlice.actions;