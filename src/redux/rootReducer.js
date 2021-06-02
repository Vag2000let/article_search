import {CREATE_TEXT, FETCH_TEXT} from "./types";

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
    default:
      return state;
  }
}
