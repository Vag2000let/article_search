import {CREATE_TEXT, DELETE_FETCH_TEXT, FETCH_MODAL_TEXT, FETCH_TEXT, HIDE_LOADING, SHOW_LOADING} from "./types";

const initialState = {
  texts: [],
  fetchTexts: [],
  fetchModalTexts: undefined,
  loading: false
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TEXT:
      return {texts: [state.texts, action.payload]};
    case FETCH_TEXT:
      return {fetchTexts: action.payload};
    case DELETE_FETCH_TEXT:
      return {fetchTexts: state.fetchTexts.filter(item => item.id !== action.payload)};
    case SHOW_LOADING:
      return {...state, loading: action.payload};
    case HIDE_LOADING:
      return {...state, loading: action.payload};
    case FETCH_MODAL_TEXT:
      return {...state, fetchModalTexts: action.payload};
    default:
      return state;
  }
}
