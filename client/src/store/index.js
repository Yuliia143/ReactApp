import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {initReducer} from './reducers/initReducer';

const store = createStore(combineReducers({
        init: initReducer,
    }
), composeWithDevTools(applyMiddleware((thunk))));

export default store;
