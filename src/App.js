import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Admin from './Admin';

/* accessContent + walletProviders*/
import { initAccessContext } from 'eos-transit';
import scatter from 'eos-transit-scatter-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';
import lynxWalletProvider from 'eos-transit-lynx-provider';





// get rid of transit.

const bp_api = {
    dev: {
        contract: 'wigglewiggle',
        host: 'jungle2.cryptolions.io',
        chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    },
    live: {
        contract: 'travelrefund',
        host: 'eos.greymass.com',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    }
}
const env = 'live'

// see if browser is open
let clientType = null
if (window.TPJSBrigeClient) {
     clientType = 'TokenPocket'
}
else if (navigator.userAgent.includes("EOSLynx")){
     clientType = 'EOS Lynx'
}
else if (!!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)){
	clientType = "mobile_browser" 
}
else {
	clientType = "desktop_browser" 
}


const accessContext = initAccessContext({
	appName: 'trf-web',
	network: {
		host: bp_api[env].host,
		port: 443,
		protocol: 'https',
		chainId: bp_api[env].chainId,
	},
	walletProviders: [
		scatter(),
        tokenpocket(),
        lynxWalletProvider()

	]
});
const walletProviders = accessContext.getWalletProviders();
console.log('walletProviders', walletProviders);
/* /accessContent + walletProviders*/


const App = () => {
    const status = useSelector((state) =>state.status)
    const dispatch = useDispatch()
	const Status = () => {
		const status = useSelector((state) =>state.status)
		const dispatch = useDispatch()
		return (<div style={{textAlign:'center', padding:20, }}>{status}</div>)
	}
    const selectWalletProvider =  async (idx) => {
        try { 
            const walletProvider = walletProviders[idx];
            const wallet = accessContext.initWallet(walletProvider);
            dispatch({type:'switch', payload: 'Wallet initialized...'})
            let connect_response = await wallet.connect()
            dispatch({type:'switch', payload: 'Connected...'})
            const discoveryData = await wallet.discover({ pathIndexList: [ 0,1,2,3 ] })
            let accountInfo = null
            if (discoveryData.keyToAccountMap.length > 0) {
                dispatch({type:'switch', payload:'Discovery complete...'})
                // @todo(seth): should allow selection
                const index = 0;
                const keyObj = discoveryData.keyToAccountMap[index];
                console.log('discovery, keyObj', keyObj)
                const accountName = keyObj.accounts[0].account;
                const authorization = keyObj.accounts[0].authorization;
                accountInfo = wallet.login(accountName, authorization)
            } 
            else { // discovery not supported (scatter for example)
                dispatch({type:'switch', payload:'Logging in...'})
                accountInfo = await wallet.login()
            }
            // logged in
            if (!accountInfo) throw Error("Not logged in")
            let username = wallet.auth.accountName

            console.log(wallet.eosApi);
            dispatch({type:'switch', payload:'Submitting to blockchain...'})
            let wallet_result = await wallet.eosApi.transact({
                actions: [{
                      account: bp_api[env].contract ,
                      name: 'create',
                      authorization: [{
                                    actor: username,
                                    permission: "active",/*wallet.auth.permission,*/
                                  }],
                      data: {user:username},
                }],
            }, {
                    broadcast: true,
                blocksBehind: 3, expireSeconds: 100});
            dispatch({type:'switch', payload:'done'})
        }
        catch(err) {
            alert(err)
                /*
             if (err instanceof RpcError){
                 console.log(JSON.stringify(e.json, null, 2));
             }
             */

            dispatch({type:'switch', payload:"error"})
            console.log('error', err)
        }
    };
    const renderWalletProviders = walletProviders.map(
        ({meta}, idx) => (<button className="button" onClick={() => { selectWalletProvider(idx )}} key={idx}>{meta.name}</button>)
    )
	const onClickApply = () => {
		// flip through all the different providers
		for (var idx = 0; idx < walletProviders.length; ++idx) {
			if (walletProviders[idx].id == clientType) {
				selectWalletProvider(idx)
				return 
			}
		}
		dispatch({type:'switch', payload: 'login_selection'}) 
	} 

    let renderLoginBox = null
	let introText = null
    if (status == 'intro') {
		if (clientType == "mobile_browser") {
			introText = (
				<>
					<p style={{fontWeight:'bold'}}>Start by opening TokenPocket or EOS Lynx, and then open this app by navigating to http://trf.eosdetroit.io.</p>
				</>)

		} else if (clientType == "desktop_browser") {
			introText = (
				<>
					<p style={{fontWeight:'bold'}}>Start by opening the <a href="scatter://open">Scatter</a> or <a href="tokenpocket://open">Token Pocket</a> and then open this app.</p>
				</>)
		}
		else {
			introText = (
				<>
					<p>I see you're logged in with {clientType}. Great!</p>
				</>)
		}
		
        renderLoginBox = (
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

					{introText}
                </div>
                <div style={{paddingTop:20}}>
                    <button className="button" onClick={onClickApply}>LOGIN WITH EOS</button>
                </div>
			</>
        )
    } else if (status == 'login_selection'){
        renderLoginBox = (
            <>{renderWalletProviders}</>
        )
    } else if (status == 'done') {
        renderLoginBox = (
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
        renderLoginBox = (
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
        renderLoginBox = (
                <>
            <h1>Something Went Awry</h1>
				<p>Hmmm.. Make sure your EOS wallet app is open?</p>
			
                    <button className="button" onClick={() => { 
						dispatch({type:'switch', payload: 'intro'})
					}}>Try Again</button>
                </>
        )

    } else {
        renderLoginBox = (
                <>
				<Status />
            </>
        )
    }

    let isAdmin = false;
    if(window.location.hash == "#admin") {
        isAdmin = true;
    }
	return (
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
					{isAdmin ? <Admin /> : renderLoginBox}
			</div>
			<div className="right"> 
				<div><img src="/img/rio_sky.jpg" /></div>
			</div>
		</div>
            <div style={{marginTop:40, paddingTop:20, paddingLeft:10, paddingRight:10, paddingBottom:60, backgroundColor:'#f3f5f9',fontSize:14, display: 'flex', justifyContent: 'center'}}>
                        <div style={{maxWidth:503, textAlign:'center'}} >
                        <br />


                        <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css"/>

                        <div>Subscribe and be notified of furture EOS Community Conferences.</div>
                        <div id="mc_embed_signup">
                        <form action="https://eosdetroit.us18.list-manage.com/subscribe/post?u=fc364bf57aca4a23d8d5bffb0&amp;id=3bdceba087" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                            <div id="mc_embed_signup_scroll">
                                <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address" required />
                            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_fc364bf57aca4a23d8d5bffb0_3bdceba087" tabindex="-1" value=""/></div>
                            <div className="clear mailchimp-subscribe-eos"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" /></div>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
		<div style={{bottom:0, position:'fixed', right: 0, padding:20}}>
			<a href="http://eosdetroit.io" target="_blank">
				<img width={65} src="/img/eos_detroit_logo_transparent.png" />
			</a>
		</div>

    </div>
	)
};

export default App;
