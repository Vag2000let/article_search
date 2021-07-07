import {createSlice} from "@reduxjs/toolkit";


// const initialState = {
//     fetchTexts: [],
//     fetchModalTexts: undefined
// }

// const fetchText = createAction(FETCH_TEXT)
// const deleteFetchText = createAction(DELETE_FETCH_TEXT)
// const colorItem = createAction(COLOR_ITEM_TEXT)
// const fetchModalText = createAction(FETCH_MODAL_TEXT)

// export default createReducer(initialState,{
//     [fetchText]: (state, action) => {
//         state.fetchTexts = action.payload
//         return state
//     },
//     [colorItem]: (state, action) => {
//         state.fetchTexts.map(
//             item => {
//                 if (item.id === action.payload) {
//                     item.color = 'primary'
//                 }
//                 return item
//             }
//         )
//         return state
//     },
//     [deleteFetchText]: (state, action) => {
//         state.fetchTexts = state.fetchTexts.filter(item => item.id !== action.payload)
//         return state
//     },
//     [fetchModalText]: (state, action) => {
//         state.fetchModalTexts = action.payload
//         return state
//     }
// })

const fetchSlice = createSlice({
    name: 'fetchSlice',
    initialState: {
        fetchTexts: [],
        fetchModalTexts: undefined
    },
    reducers: {
        fetchText: (state, action) => {
            state.fetchTexts = action.payload
        },
        deleteFetchItem: (state, action) => {
            state.fetchTexts = state.fetchTexts.filter(item => item.id !== action.payload)
        },
        // deleteModalText: (state) => {
        //     return state.fetchTexts
        // },
        fetchModalText: (state, action) => {
            state.fetchModalTexts = action.payload
        },
        colorItem: (state, action) => {
            state.fetchTexts = state.fetchTexts.map(
                item => {
                    if (item.id === action.payload) {
                        item.color = 'primary'
                    }
                    return item
                }
            )
        }
    }
})
//     extraReducers: (builder) => {
//         builder.addCase(fetchText, (state, action) => {
//                 state.fetchTexts = action.payload
//             })
//         builder.addCase(deleteFetchText, (state, action) => {
//                 state.fetchTexts = state.fetchTexts.filter(item => item.id !== action.payload)
//             })
//         builder.addCase(fetchModalText, (state, action) => {
//                 state.fetchModalTexts = action.payload
//             })
//         builder.addCase(colorItem, (state, action) => {
//                 state.fetchTexts = state.fetchTexts.map(
//                     item => {
//                         if (item.id === action.payload) {
//                             item.color = 'primary'
//                         }
//                         return item
//                     }
//                 )
//             })
//     }
// })
export default fetchSlice.reducer;
export const {fetchText, deleteFetchItem, fetchModalText, colorItem} = fetchSlice.actions