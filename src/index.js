import React from 'react';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import FormTexts from './components/FormTexts';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./toolkitRedux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

// const saga = createSagaMiddleware()
// const store = createStore(rootReducer, compose(
//   applyMiddleware(
//     thunk, saga
//   ),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

// saga.run(rootSaga)
// const language = localStorage.getItem('language')
// console.log(language)

const app = (
  <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path="/" component={FormTexts}/>
            <Redirect to="/ru"/>
        </Switch>
    </BrowserRouter>
  </Provider>
)
render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
