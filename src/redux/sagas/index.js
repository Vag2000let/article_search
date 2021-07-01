import {takeEvery, put, call} from "redux-saga/effects";
import {CREATE_TEXT, FETCH_TEXT} from "../types";
import {v4 as uuidv4} from 'uuid';

async function fetchWiki({search, language}) {
    // console.log(search, language)
    const url = `https://${language}.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${search}&limit=15&namespace=*&format=json`;
    const response = await fetch(url);
    const json = await response.json();
    const wiki = []
    json[1].forEach((value, key) => wiki.push({
        id: uuidv4(),
        title: json[1][key],
        url: json[3][key],
        color: 'default'
    }))
    return wiki
}

export function* fetchWorker({payload}) {
    const wiki = yield call(fetchWiki, payload);
    // console.log(wiki)
    yield put({type: FETCH_TEXT, payload: wiki})
}

export function* sagaWatcher() {
    yield takeEvery(CREATE_TEXT, fetchWorker)
}

export default function* rootSaga() {
    yield sagaWatcher();
}