import {CREATE_TEXT, FETCH_TEXT} from "./types";


export function createText(title) {
  return {
    type: CREATE_TEXT,
    payload: title
  }
}

export function fetchWiki(search) {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=${search}&namespace=0&limit=5`;

  return async dispatch => {
    const response = await fetch(url);
    const json = await response.json();
    const wiki = []
    json.forEach((item, key) => wiki.push({title: json[1][key], url: json[3][key]}));
    dispatch({type: FETCH_TEXT, payload: wiki})
  }
}