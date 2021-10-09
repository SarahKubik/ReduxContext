import { createStore } from 'redux';
import { combineReducers } from 'redux';


const store = createStore(combineReducers,
    {},
    //view redux tools in browser
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );
export default store;