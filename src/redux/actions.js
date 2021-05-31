import {CREATE_TEXT, FETCH_TEXT} from "./types";


export function createText(title) {
  return {
    type: CREATE_TEXT,
    payload: title
  }
}

export function fetchWiki(title, url) {
  return {
    type: FETCH_TEXT,
    payload: title, url
  }
}