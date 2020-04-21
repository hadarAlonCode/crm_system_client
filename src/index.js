import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/reducers'

const history = createBrowserHistory()
const store = createStore(
  reducers(history),
  compose(applyMiddleware(routerMiddleware(history), ReduxThunk))
)


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister();


