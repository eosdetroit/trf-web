import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { accessContext, walletProviders } from './defaultData.js';



const Status = () => {
    const status = useSelector((state) =>state.status)
    const dispatch = useDispatch()
    return (<div>{status}</div>)
}
const Wallets = () => {
    const dispatch = useDispatch()

    const onWalletProviderClick = (idx) => (async (el) => {
        // @todo(seth): just do a dispatch, and move all this logic there
        dispatch({type:'DO'})
        try { 
            const walletProvider = walletProviders[idx];
            const wallet = accessContext.initWallet(walletProvider);
            dispatch({type:'INIT'})
            console.log('Wallet initialized', wallet)
            let connect_response = await wallet.connect()
            console.log('Successfully connected!', connect_response)
            dispatch({type:'CONNECTED'})
            const discoveryData = await wallet.discover({ pathIndexList: [ 0,1,2,3 ] })
            let accountInfo = null
            if (discoveryData.keyToAccountMap.length > 0) {
                dispatch({type:'DISCOVERY'})
                console.log('Discovery successfully completed!', discoveryData);
                // @todo(seth): should allow selection
                const index = 0;
                const keyObj = discoveryData.keyToAccountMap[index];
                const accountName = keyObj.accounts[0].account;
                const authorization = keyObj.accounts[0].authorization;
                accountInfo = wallet.login(accountName, authorization)
            } 
            else { // discovery not supported (scatter for example)
                dispatch({type:'LOGGING_IN'})
                accountInfo = await wallet.login()
            }
            // logged in
            if (!accountInfo) throw Error("Not logged in")
            console.log('Successfully logged in', accountInfo);
            console.log('wallet', wallet)
            dispatch({type:'DONE'})
        }
        catch(err) {
            dispatch({type:'ERROR'})
            console.log('error', err)
        }
    });

    const renderWalletProviders = walletProviders.map(
        ({meta}, idx) => (<div className="button" onClick={onWalletProviderClick(idx, accessContext, walletProviders)} key={idx}>{meta.shortName}</div>)
    )

    return <>{renderWalletProviders}</>
}


const App = ({accessContext, walletProviders}) => {
    const [showLogin, setShowLogin] = useState(false)
    let renderLoginBox = null
    if (!showLogin) {
        renderLoginBox = (
			<div style={{minWidth:500, flexGrow:1, paddingRight:10}}> 
                <div>
                <p>this is the greatest thing in the world</p>
                </div>
                <div>
                    <div className="button" onClick={() => { setShowLogin(true) }} >Login with EOS</div>
                </div>
			</div>
        )
    } else {
        renderLoginBox = (
			<div style={{minWidth:500, flexGrow:1, paddingRight:10}}> 
                <Wallets accessContext={accessContext} walletProviders={walletProviders} />
				<Status />
			</div>
        )

    }
	return (
    <div style={{display:'flex', flexDirection: 'column'}}> 
        <div style={{display:'flex', flexDirection: 'row', backgroundColor:'#F3F5F9',}}>
            <div style={{flexGrow:1, padding: '20px 20px',   display:'flex', flexDirection: 'column', flexGrow: 1,  letterSpacing: '1px', fontSize:23, }} > TRAVEL REIMBURSMENT FUND</div>
            <div style={{ maxHeight:200, borderBottomRightRadius:5, borderBottomLeftRadius: 5, padding: '20px 20px', backgroundColor:'#F3F5F9', letterSpacing: '1px', fontWeight:'bold', fontSize:23}} >
                <a style={{textDecoration:'none'}} target="_blank" href="http://eosdetroit.io">EOS DETROIT</a>
            </div>
        </div>
    
        <div style={{ margin:'0 auto', maxWidth:1000, display:'flex', flexDirection: 'row', padding:20, alignItems:'flex-start', alignContent:'flex-start'}}>
            {renderLoginBox}
			<div style={{flexGrow:0}}> 
				<div><img src="/img/trf_sky.png" /></div>
			</div>
		</div>
    </div>
	)
};

export default App;
