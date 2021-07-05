import {createAction, createReducer} from "@reduxjs/toolkit";
import {CREATE_TEXT} from "../redux/types";


const initialState = {
    texts: []
}

const texts = createAction(CREATE_TEXT)

export default createReducer(initialState, {
    [texts]: (state, action) => {
        state.texts = action.payload
        return state
    }
})