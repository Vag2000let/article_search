import {takeEvery, put, call} from "redux-saga/effects";
import {
    CREATE_TEXT,
    FETCH_TEXT,
    FETCH_MODAL_TEXT,
    SHOW_LOADING,
    HIDE_LOADING,
    FETCH_TITLE
} from "../types";
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';


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

async function fetchModal(payload) {
    const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=revisions&titles=${payload}&rvprop=content&format=json&rvsection=0&rvparse=1`;
    const response = await fetch(url);
    const json = await response.json();
    const s = _.map(json.query["pages"], "revisions")
    const modal = _.head(
        _.map(s[0][0], (item) => {
            return item;
        })
    )
    return modal
}

export function* fetchWorker({payload}) {
    const wiki = yield call(fetchWiki, payload);
    // console.log(wiki)
    yield put({type: FETCH_TEXT, payload: wiki})
}

export function* fetchModalWorker({payload}) {
    yield put({type: SHOW_LOADING, payload: true})
    const modal = yield call(fetchModal, payload)
    yield put({type: FETCH_MODAL_TEXT, payload: modal})
    yield put({type: HIDE_LOADING, payload: false})

}

export function* sagaWatcher() {
    yield takeEvery(CREATE_TEXT, fetchWorker)
    yield takeEvery(FETCH_TITLE, fetchModalWorker)
}

export default function* rootSaga() {
    yield sagaWatcher();
}