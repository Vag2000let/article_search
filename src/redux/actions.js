import {
    CREATE_TEXT,
    DELETE_FETCH_TEXT,
    FETCH_MODAL_TEXT,
    FETCH_TEXT,
    HIDE_LOADING,
    SHOW_LOADING,
    DELETE_MODAL_TEXT,
    COLOR_ITEM_TEXT
} from "./types";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';


export function createText(title) {
  return {
    type: CREATE_TEXT,
    payload: title
  }
}

export function fetchWiki({search, language}) {
    const url = `https://${language}.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${search}&limit=15&namespace=*&format=json`;
    return async dispatch => {
        const response = await fetch(url);
        const json = await response.json();
        const wiki = []
        json[1].forEach((value, key) => wiki.push({
            id: uuidv4(),
            title: json[1][key],
            url: json[3][key],
            color: 'default'
        }))
        dispatch({type: FETCH_TEXT, payload: wiki})
    }
}

export function deleteFetchItem(id) {
    return {
        type: DELETE_FETCH_TEXT,
        payload: id
    }
}

export function itemColor(id) {
    return {
        type: COLOR_ITEM_TEXT,
        payload: id
    }
}

export function showLoader() {
    return {type: SHOW_LOADING, payload: true}
}

export function hideLoader() {
    return {type: HIDE_LOADING, payload: false}
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
        dispatch({type: FETCH_MODAL_TEXT, payload: modal});
        dispatch(hideLoader());
    }
}

export function deleteModalText() {
    return {
        type: DELETE_MODAL_TEXT
    };
}
