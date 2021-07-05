import {FETCH_TEXT, FETCH_MODAL_TEXT, DELETE_FETCH_TEXT, COLOR_ITEM_TEXT} from "../types";


const initialState = {
    fetchTexts: [],
    fetchModalTexts: [{title: undefined, text: undefined}]
}

export default function fetch(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEXT:
            return {fetchTexts: action.payload};
        case DELETE_FETCH_TEXT:
            return {fetchTexts: state.fetchTexts.filter(item => item.id !== action.payload)};
        case COLOR_ITEM_TEXT:
            return {
                ...state, fetchTexts: state.fetchTexts.map(
                    item => {
                        if (item.id === action.payload) {
                            item.color = 'primary'
                        }
                        return item
                    }
                )
            };
        case FETCH_MODAL_TEXT:
            return {...state, fetchModalTexts: action.payload};
        default:
            return state;
    }
}
