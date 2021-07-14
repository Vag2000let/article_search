import React from 'react';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import FormTexts from './components/FormTexts';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./toolkitRedux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// const saga = createSagaMiddleware()
// const store = createStore(rootReducer, compose(
//   applyMiddleware(
//     thunk, saga
//   ),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

// saga.run(rootSaga)

const app = (
  <Provider store={store}>
    <Router>
        <Switch>
            <Route path="/" component={FormTexts}/>
            <Route path=":language" component={FormTexts}/>
        </Switch>
    </Router>
  </Provider>
)
render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
