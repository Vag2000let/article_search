import {CREATE_TEXT, DELETE_FETCH_TEXT, FETCH_TEXT} from "./types";

const initialState = {
  texts: [],
  fetchTexts: []
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEXT:
      return {texts: [...state.texts, action.payload]};
    case FETCH_TEXT:
      return {fetchTexts: action.payload};
    case DELETE_FETCH_TEXT:
      return {fetchTexts: state.fetchTexts.filter(item => item.id !== action.payload)};
    default:
      return state;
  }
}
