import {CREATE_TEXT} from "./types";

const initialState = {
    texts: []
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TEXT:
            return { texts: [...state.texts, action.payload]};
        default:
            return state;
    }
}
