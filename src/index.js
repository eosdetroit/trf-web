import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
//import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const statusReducer = (status = 'intro', action ) => {
    switch(action.type) {
        case "switch":
            return  action.payload;
        default: 
            return status;
    }
}

let reducers = combineReducers(
    {
        "status": statusReducer,
    }
)
let store = createStore(reducers);
        
ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>), document.getElementById('root'));

//serviceWorker.register();

