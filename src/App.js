import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { accessContext, walletProviders } from './defaultData.js';
import { Autocomplete} from './autocomplete'
import { haversine } from './airport_utils.js'




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

const Button = ({children}) => (<div className="">{children}</div>)
const Label = ({children}) => (<div className="label">{children}</div>)
    const empty = {
        lat: null,
        lng: null,
        name: null
    }
const Text = ({value, setState, children}) => {
	if (setState) {
		return (
            <input type="text" value={value} onChange={(e) => setState(e.target.value)} />
        )
	}
	else {
		return null
	}
}
const AirportText = ({value, setState, children}) => {
	if (setState) {
		return (
         <Autocomplete
            setPoint={ (data) => { setState(data)}}
            clearPoint={ () => setState(empty)}
          />)
	}
	else {
		return null
	}
}

const App = ({accessContext, walletProviders}) => {
	const [start, setStart] = useState(empty)
	const [end, setEnd] = useState(empty)
	const [distance, setDistance] = useState(null)
	useEffect(() => {
        if (start.name && end.name) {
          const distance_result = haversine(start.lat, start.lng, end.lat, end.lng);
            console.log('distance_result', distance_result)
            setDistance(distance_result)
        }
        else {
            console.log('null', start, end )
            setDistance(null)
        }
	}, [start, end])




	return (
    <div style={{display:'flex'}}> 
        <div style={{display:'flex', flexDirection: 'column', backgroundColor:'#F3F5F9',}}>
            <div style={{letterSpacing: '1px', padding:'10px', fontWeight:'bold', fontSize:23}} >TRF</div>
            <div style={{flexGrow:1, padding: '20px 20px',   display:'flex', flexDirection: 'column', flexGrow: 1,  letterSpacing: '1px', fontSize:23, writingMode: 'sideways-lr',textAlign:'center' }} > TRAVEL REIMBURSMENT FUND</div>
        </div>
    
        <div style={{ margin:'0 auto', maxWidth:1000, display:'flex', flexDirection: 'row', padding:20, alignItems:'center', alignContent:'flex-start'}}>
			<div style={{flexGrow:1, paddingRight:10}}> 
					<Label>Departure</Label>
					<AirportText setState={setStart}>DTW</AirportText>
					<Label>Destination</Label>
					<AirportText setState={setEnd}>RIO</AirportText>
					<Label>Distance</Label>
					<div className="result">{distance}</div>
        <br />
        <br />
                    <Wallets accessContext={accessContext} walletProviders={walletProviders} />
				<Status />
			</div>
			<div style={{flexGrow:0}}> 
				<div><img src="/img/trf_sky.png" /></div>
			</div>
		</div>
            <div style={{ writingMode:'vertical-lr', justifyContent:'flex-end', }} >
                <div style={{ maxHeight:200, borderBottomRightRadius:5, borderBottomLeftRadius: 5, padding: '20px 20px', backgroundColor:'#F3F5F9', letterSpacing: '1px', fontWeight:'bold', fontSize:23}} >
                    <a style={{textDecoration:'none'}} target="_blank" href="http://eosdetroit.io">EOS DETROIT</a>
                </div>
            </div>
    </div>
	)
};

export default App;
