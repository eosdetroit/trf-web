import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

/* accessContent + walletProviders*/
import Apply from './Apply'

let deviceType = null
if (!!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)){
    deviceType = "mobile" 
}
else {
    deviceType = "computer" 
}

let deviceCompany = null
if (!!navigator.userAgent.match(/iPhone|iPad|iPod/i)){
    deviceCompany = "apple" 
}
else if (!!navigator.userAgent.match(/Android/i)){
    deviceCompany = "android" 
}

let walletType = null
if (!!navigator.userAgent.includes("TokenPocket")){
    walletType = 'tp'
}
else if (navigator.userAgent.includes("EOSLynx")){
    walletType = 'lynx'
}
let walletButtons = null
if (deviceType == "mobile" && walletType == null) {
    walletButtons = 
        <a className="button" href='tpdapp://open?params={"url": "http://trfdev.sethdetroit.com", "chain": "EOS", "source":"xxx"}'>LOGIN WITH TOKENPOCKET</a>
} else if (deviceType == "computer" && walletType == null) {
    walletButtons = <Apply walletType="scatter" walletName="SCATTER" />
} else if (deviceType == "mobile" && walletType == 'tp') {
    walletButtons = <Apply walletType="tp" walletName="TOKENPOCKET" />
} else if (deviceType == "mobile" && walletType == 'lynx') {
    walletButtons = <Apply walletType="lynx" walletName="LYNX" />
}
/*
if (window.TPJSBrigeClient) {
     walletType = 'TokenPocket'
}
*/

    /*
     *
     * For debugging
document.write(
    "<div>userAgent: " +window.navigator.userAgent+"</div>"+
    "<div>deviceType: " + deviceType + "</div>" + 
    "<div>deviceCompany: " + deviceCompany+ "</div>" + 
    "<div>walletType: " + walletType + "</div>" + 
    '<div><a href=\'tpdapp://open?params={"url": "http://trfdev.sethdetroit.com", "chain": "EOS", "source":"xxx"}\'>Open url with TokenPocket</a></div>')
    */



const App = () => {
    const status = useSelector((state) =>state.status)
    const error = useSelector((state) =>state.error)
    const dispatch = useDispatch()

    const Status = () => {
        const status = useSelector((state) =>state.status)
        const dispatch = useDispatch()
        return (<div style={{textAlign:'center', padding:20, }}>{status}</div>)
    }

    if (status == 'home') {
        // @cleanup: these if statements are basically in Apply.js as well

        return (
            <>
                <div>
                    <div className="hideOnDesktop" style={{textAlign:'center',paddingBottom:40}}>
                        <img src="/img/rio_mobile.jpg" />
                    </div>
                    <h1>What is the Travel Reimbursement Fund?</h1>

                    <p>The Travel Reimbursement Fund is an initiative to make EOSIO community events inclusive, rolled out for the 2019 EOS Community Conference in Rio de Janeiro.</p>

                    <p>By providing a pro-rata travel stipend to attendees, together we can subsidize the costs of travel for our EOSIO community.</p>

                    <p>All attendees are welcome to opt-in! A warm thanks goes out to the generous donors who made this possible:</p>
                    <div className="donors" style={{}}>
                        <a className="donors--a" target="_blank" href="https://eosrio.io">EOS Rio</a>
                        <a className="donors--a" target="_blank" href="https://eoslaomao.com">EOS LaoMao</a>
                        <a className="donors--a" target="_blank" href="">EOS BP Legal Fund Donors</a>
                        <a className="donors--a" target="_blank" href="https://eosdetroit.io">EOS Detroit</a>
                    </div>
                    <h2>Applying</h2>

                    <p>Just login with your EOS username, then bring your travel info (a flight email or home address) and show it to Robrigo at the event.</p>

                </div>
                <div style={{paddingTop:20}}>
                    {walletButtons}
                </div>
            </>
            )
            } else if (status == 'done') {
                return (
                    <>
                        <div>
                            <p>Success! Now find this Rob guy, and show him your travel info. </p>
                            <p>(A flight email, or something that has your home town on it.)</p>
                        </div>
                        <div style={{textAlign:'center'}}>
                            <img src="/img/rob.jpg" />
                        </div>
                    </>
                )
            } else if (status == 'already_signed_up') {
                return (
                    <>
                        <div>
                            You're already signed up. Now you just need to find this Robrigo guy, and hand him your travel info.  
                        </div>
                        <div>
                            <img src="/img/rob.jpg" />
                        </div>
                    </>
                )
            } else if (status == 'error') {
                return (
                    <>
                        <h1>Something Went Awry</h1>
                        <p>{error.message}</p>
                        <p>Error Code: {error.code}</p>
                        <p>Failed During: {error.stage}</p>

                    <div style={{paddingTop:20}}>
                        <p>Try again?</p>
                        {walletButtons}
                    </div>
                        <button className="button" onClick={() => { 
                            dispatch({type:'switch', payload: 'home'})
                        }}>Back</button>
                        </>
                )

            } else {
                return <Status />
            }

            };

            export default App;
