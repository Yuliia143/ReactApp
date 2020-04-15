import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {initReducer} from './reducers/initReducer';
import user from "./reducers/user";

const store = createStore(combineReducers({
       user
    }
), composeWithDevTools(applyMiddleware((thunk))));

export default store;
