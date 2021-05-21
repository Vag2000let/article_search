import {CREATE_TEXT} from "./types";

const initialState = {
    texts: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEXT:
            return {...state, texts: state.texts.concat([action.payload])}
        default:
            return state
    }
}
