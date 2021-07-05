import {takeEvery, put, call} from "redux-saga/effects";
import {
    CREATE_TEXT,
    FETCH_TEXT,
    FETCH_MODAL_TEXT,
    SHOW_LOADING,
    HIDE_LOADING,
    FETCH_TITLE
} from "../types";
import {fetchWiki, fetchModal} from "../../api/fetch";


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