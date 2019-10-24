import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
import './index.css';
import App from './App';
import Admin from './Admin';
//import * as serviceWorker from './serviceWorker';


const statusReducer = (status = 'home', action ) => {
    switch(action.type) {
        case "switch":
            document.getElementById('main-js').scrollIntoView({behavior: 'smooth'});
            return  action.payload;
        case "error":
            document.getElementById('main-js').scrollIntoView({behavior: 'smooth'});
            return  'error';
        default: 
            return status;
    }
}

const emptyError = {code: '', message: '', stage: ''}
const errorReducer = (error= emptyError, action ) => {
    switch(action.type) {
        case "error":
            return  action.payload;
        case "clear":
            return  emptyError;
        case "switch":
            return  emptyError;
        default: 
            return emptyError;
    }
}

let reducers = combineReducers(
    {
        "status": statusReducer,
        "error": errorReducer
    }
)
let store = createStore(reducers);

let isAdmin = false;
if(window.location.hash == "#admin") {
    isAdmin = true;
}
const Mailchimp = () => (
    <div style={{marginTop:40, paddingTop:20, paddingLeft:10, paddingRight:10, paddingBottom:60, backgroundColor:'#f3f5f9',fontSize:14, display: 'flex', justifyContent: 'center'}}>
        <div style={{maxWidth:503, textAlign:'center'}} >
        <br />
        <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"/>
        <div>Subscribe and be notified of future EOS Community Conferences.</div>
        <div id="mc_embed_signup">
            <form action="https://eosdetroit.us18.list-manage.com/subscribe/post?u=fc364bf57aca4a23d8d5bffb0&amp;id=3bdceba087" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                    <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                        <input type="text" name="b_fc364bf57aca4a23d8d5bffb0_3bdceba087" tabIndex="-1" readOnly value=""/>
                    </div>
                    <div className="clear mailchimp-subscribe-eos">
                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
                    </div>
                </div>
            </form>
        </div> 

        </div>
    </div>
)
        
ReactDOM.render(
    (<Provider store={store}>
    <div style={{display:'flex', flexDirection: 'column'}}> 
        <div className="nav-desktop">
            <div style={{flexGrow:1, padding: '13px 25px',   display:'flex', flexDirection: 'column', flexGrow: 1,  letterSpacing: '1px', fontSize:19, }} > TRAVEL REIMBURSMENT FUND</div>
            <div style={{ maxHeight:200, borderBottomRightRadius:5, borderBottomLeftRadius: 5, padding: '13px 25px', backgroundColor:'#F3F5F9', letterSpacing: '1px', fontWeight:'bold', fontSize:19}} >
                <a style={{textDecoration:'none'}} target="_blank" href="http://eosdetroit.io">EOS DETROIT</a>
            </div>
        </div>
        <div className="nav-mobile" style={{textAlign:'center'}}>
            <div style={{fontSize:26, padding:20, backgroundColor:'#bfc3c9'}}>
                EOS DETROIT
            </div>
            <div style={{padding:20, backgroundColor:'#f3f5f9'}}>
                TRAVEL REIMBURSMENT FUND
            </div>
        </div>
    
        <div id="main-js" className="main">
			<div className="left" style={{minHeight:'80vh', padding:'20px 20px 0'}}>
                {isAdmin ? <Admin /> : <App />}
			</div>
			<div className="right"> 
				<div><img src="/img/rio_sky.jpg" /></div>
			</div>
		</div>

        <Mailchimp />
		<div style={{bottom:0, position:'fixed', right: 0, padding:20}}>
			<a href="http://eosdetroit.io" target="_blank">
				<img width={65} src="/img/eos_detroit_logo_transparent.png" />
			</a>
		</div>

    </div>
    </Provider>), document.getElementById('root'));

//serviceWorker.register();

