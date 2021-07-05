import {createAction, createReducer} from "@reduxjs/toolkit";
import {COLOR_ITEM_TEXT, DELETE_FETCH_TEXT, FETCH_MODAL_TEXT, FETCH_TEXT} from "../redux/types";


const initialState = {
    fetchTexts: [],
    fetchModalTexts: undefined
}

const fetchText = createAction(FETCH_TEXT)
const deleteFetchText = createAction(DELETE_FETCH_TEXT)
const colorItem = createAction(COLOR_ITEM_TEXT)
const fetchModalText = createAction(FETCH_MODAL_TEXT)

export default createReducer(initialState,{
    [fetchText]: (state, action) => {
        state.fetchTexts = action.payload
        return state
    },
    [colorItem]: (state, action) => {
        state.fetchTexts.map(
            item => {
                if (item.id === action.payload) {
                    item.color = 'primary'
                }
                return item
            }
        )
        return state
    },
    [deleteFetchText]: (state, action) => {
        state.fetchTexts = state.fetchTexts.filter(item => item.id !== action.payload)
        return state
    },
    [fetchModalText]: (state, action) => {
        state.fetchModalTexts = action.payload
        return state
    }
})