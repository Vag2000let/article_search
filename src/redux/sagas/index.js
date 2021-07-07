import {takeEvery, put, call} from "redux-saga/effects";
// import {
//     CREATE_TEXT,
//     FETCH_TEXT,
//     FETCH_MODAL_TEXT,
//     SHOW_LOADING,
//     HIDE_LOADING,
//     FETCH_TITLE
// } from "../types";
import {fetchWiki, fetchModal} from "../../api/fetch";
import {texts} from "../../toolkitRedux/textsReducer";
import {fetchModalText, fetchText} from "../../toolkitRedux/fetchReducer";
import {hideLoading, showLoading} from "../../toolkitRedux/loadingReducer";


export function* fetchWorker({payload}) {
    const wiki = yield call(fetchWiki, payload);
    // console.log(wiki)
    yield put({type: fetchText, payload: wiki})
}

export function* fetchModalWorker({payload}) {
    yield put({type: showLoading, payload: true})
    const modal = yield call(fetchModal, payload)
    yield put({type: fetchModalText, payload: modal})
    yield put({type: hideLoading, payload: false})

}

export function* sagaWatcher() {
    yield takeEvery(texts, fetchWorker)
    yield takeEvery(fetchModalText, fetchModalWorker)
}

export default function* rootSaga() {
    yield sagaWatcher();
}