import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

const counterReducer = (count = 0, action ) => {
    switch(action.type) {
        case "INCREMENT":
            return  count +1 ;
        case "DECREMENT":
            return count - 1;
        default: 
            return count;
    }
}
const statusReducer = (status = '', action ) => {
    switch(action.type) {
        case "DO":
            return  'doing something';
        case "DONE":
            return 'done!';
        case "NOTHING":
            return 'doing nothing';
        case "ERROR":
            return 'error';
        default: 
            return status;
    }
}

let reducers = combineReducers(
    {
        "count": counterReducer,
        "status": statusReducer,
    }
)
let store = createStore(reducers);
        
ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
