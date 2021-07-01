import React from 'react';
import {render} from 'react-dom';
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import FormTexts from './components/FormTexts';
import rootReducer from "./redux/reducers/rootReducer";
import './index.css';
import {Provider} from "react-redux";
import rootSaga from "./redux/sagas/index";

const saga = createSagaMiddleware()
const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk, saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

saga.run(rootSaga)

const app = (
  <Provider store={store}>
    <FormTexts/>
  </Provider>
)
render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
