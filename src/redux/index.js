/**
 * Creact by 小公主 on 2019/12/07.
 */
import thunk from 'redux-thunk'
import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(reducer,enhancer)

export default store


