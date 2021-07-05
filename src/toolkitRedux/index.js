import {combineReducers} from "@reduxjs/toolkit";
import fetchReducer from "./fetchReducer";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/sagas/index";
import textsReducer from "./textsReducer";
import loadingReducer from "./loadingReducer";



const rootReducer = combineReducers({
    fetch: fetchReducer,
    texts: textsReducer,
    loading: loadingReducer
})

const saga = createSagaMiddleware()

export const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))


saga.run(rootSaga)
