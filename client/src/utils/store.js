// import { createStore } from 'redux';
// import { combineReducers } from 'redux';


// const store = createStore(combineReducers,
//     {},
//     //view redux tools in browser
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

//     );
// export default store;

import { createStore } from 'redux';
import { reducer } from './reducers';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(reducer);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()));


export default store;