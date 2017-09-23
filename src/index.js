import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link} from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware,combineReducers, compose} from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()

const middleware = routerMiddleware(history)

console.log(reducers)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware,thunk,logger)
)


ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
      <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
);

registerServiceWorker();
