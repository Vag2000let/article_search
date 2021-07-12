import {combineReducers} from "@reduxjs/toolkit";
import fetchReducer from "./fetchReducer";
import {applyMiddleware, compose, createStore} from "redux";
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

// Первоначальное состояние из localStorage
const persistedState = localStorage.getItem('wikis')
    ? JSON.parse(localStorage.getItem('wikis'))
    : {}

export const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(
        saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(rootSaga)
