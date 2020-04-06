import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import login_reducer from './login_reducer'

export default (history) => combineReducers({
    router: connectRouter(history),
    login: login_reducer,
})