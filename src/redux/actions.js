import {CREATE_TEXT} from "./types";


export function createText(title) {
  return {
    type: CREATE_TEXT,
    payload: title
  }
}