import {SHOW_LOADING, HIDE_LOADING} from "../types";


const initialState = {
    loading: false
}

export default function loading(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            return {...state, loading: action.payload};
        case HIDE_LOADING:
            return {...state, loading: action.payload};
        default:
            return state;
    }
}

