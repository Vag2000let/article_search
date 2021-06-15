import {CREATE_TEXT, DELETE_FETCH_TEXT, FETCH_MODAL_TEXT, FETCH_TEXT, HIDE_LOADING, SHOW_LOADING} from "./types";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


export function createText(title) {
  return {
    type: CREATE_TEXT,
    payload: title
  }
}

export function fetchWiki(search) {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${search}&limit=15&namespace=*&format=json`;

  return async dispatch => {
    const response = await fetch(url);
    const json = await response.json();
    const wiki = []
    json[1].forEach((value, key) => wiki.push({id: uuidv4(), title: json[1][key], url: json[3][key]}))
    dispatch({type: FETCH_TEXT, payload: wiki})
  }
}

export function deleteFetchItem(id) {
  return {
    type: DELETE_FETCH_TEXT,
    payload: id
  }
}

export function showLoader () {
  return {type: SHOW_LOADING}
}

export function hideLoader () {
  return {type: HIDE_LOADING}
}

export function fetchModalText(title) {
  const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&titles=${title}&rvprop=content&format=json&rvsection=0&rvparse=1`;

  return async dispatch => {
    dispatch(showLoader())
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json.query["pages"])
    const s = _.map(json.query["pages"], "revisions")
    const modal = _.head(
      _.map(s[0][0], (item) => {
        return item;
      })
    );
    dispatch({type: FETCH_MODAL_TEXT, payload: modal})
    dispatch(hideLoader())
    console.log("I am modal action", modal)
  }
}