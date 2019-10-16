import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";


/* needs compression */
import { initAccessContext } from 'eos-transit';
import scatter from 'eos-transit-scatter-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';
import lynxWalletProvider from 'eos-transit-lynx-provider';
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
const env = 'live'
var geoXhr = new XMLHttpRequest();

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


// the conference const rio = {lat: -22.9669101,lng: -43.1811887}
// the city
const rio = {lat: -22.9110137,lng: -43.2093727}


const Admin = () => {
	let geoTimer = null
       const [error, setError] = useState(null);
		const [loaded, setLoaded] = useState(false);
		const [froms, setFroms] = useState([]);
		const [originalFroms, setOriginalFroms] = useState([]);
		const [user, setUser] = useState(null);
		const [destinationFilter, setDestinationFilter] = useState(null);
		const [destinations, setDestinations] = useState([]);
		const [destination, setDestination] = useState(null);
		const [distance, setDistance] = useState(null);

		const selectWalletProvider =  async (idx, action) => {
			try { 
				const walletProvider = walletProviders[idx];
				const wallet = accessContext.initWallet(walletProvider);
				let connect_response = await wallet.connect()
				const discoveryData = await wallet.discover({ pathIndexList: [ 0,1,2,3 ] })
				let accountInfo = null
				if (discoveryData.keyToAccountMap.length > 0) {
					// @todo(seth): should allow selection
					const index = 0;
					const keyObj = discoveryData.keyToAccountMap[index];
					const accountName = keyObj.accounts[0].account;
					const authorization = keyObj.accounts[0].authorization;
					accountInfo = wallet.login(accountName, authorization)
				} 
				else { // discovery not supported (scatter for example)
					accountInfo = await wallet.login()
				}
				// logged in
				if (!accountInfo) throw Error("Not logged in")
				let adminUsername = wallet.auth.accountName

				console.log(wallet.eosApi);
				let wallet_result = await wallet.eosApi.transact({
					actions: [{
						  account: bp_api[env].contract ,
						  name: action,
						  authorization: [{
										actor: adminUsername,
										permission: "active",/*wallet.auth.permission,*/
									  }],
						  data: {user:user, distance: distance},
					}],
				}, {
						broadcast: true,
					blocksBehind: 3, expireSeconds: 10});
				window.alert('Done!')
				// @todo make this a clear function
					setUser(null);
					setDestination(null);
					setDistance(null);
					setDestinations([]);
					setFroms([]);

			}
			catch(err) {
				alert(err)

				console.log('error', err)
			}
		};
		useEffect(() => {
			clearTimeout(setTimeout);
			geoTimer = setTimeout(() => {
				if(destinationFilter) {
					geoXhr.onreadystatechange = function() {
						if (geoXhr.readyState == 4)
						{
							if(geoXhr.status==200) {
								let json = JSON.parse(geoXhr.responseText)
								console.log(json.features)
								setDestinations(json.features);
							}
						}
					};
					geoXhr.open("GET", "https://api.opencagedata.com/geocode/v1/geojson?q="+encodeURIComponent(destinationFilter)+"&key=457712e7eb8a4316a4580bcbb41828aa&language=en&pretty=1&no_annotations=1");
					geoXhr.send();
				}
				
			}, 300)
	}, [destinationFilter]);

	useEffect(() => {
		if (destination) {
			let coords = destination.geometry.coordinates;
			function calcDistance(lat1, lon1, lat2, lon2, unit) {
				if ((lat1 == lat2) && (lon1 == lon2)) {
					return 0;
				}
				else {
					var radlat1 = Math.PI * lat1/180;
					var radlat2 = Math.PI * lat2/180;
					var theta = lon1-lon2;
					var radtheta = Math.PI * theta/180;
					var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
					if (dist > 1) {
						dist = 1;
					}
					dist = Math.acos(dist);
					dist = dist * 180/Math.PI;
					dist = dist * 60 * 1.1515;
					if (unit=="K") { dist = dist * 1.609344 }
					if (unit=="N") { dist = dist * 0.8684 }
					return Math.round(dist);
				}
			}
			setDistance(calcDistance(rio.lat, rio.lng, coords[1], coords[0]));
		}
	}, [destination]);
					
					
	useEffect(() => { 
		if (!loaded) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4)
				{
					if(xhr.status==200) {
						let json = JSON.parse(xhr.responseText)
						console.log(json);
						setOriginalFroms(json.rows)
						setLoaded(true)
					}
				}
			};
			xhr.open("POST", "http://eos.greymass.com/v1/chain/get_table_rows");
			xhr.send('{"table":"requests","scope":"travelrefund","code":"travelrefund","limit":100,"json":true}');
		}
	}, [loaded])
	//curl --request POST --url http://eos.greymass.com/v1/chain/get_table_rows --data '{"table":"requests","scope":"travelrefund","code":"travelrefund","limit":100,"json":true}'


	if (clientType == "mobile_browser" || clientType == "desktop_browser"){
		return (<div>Use the TokenPocket app or EOS Lynx</div>)
	}
	const onApprove = () => {
		// flip through all the different providers
		var response = window.confirm("Approve this user?");
		if (response) {
			for (var idx = 0; idx < walletProviders.length; ++idx) {
				if (walletProviders[idx].id == clientType) {
					selectWalletProvider(idx, 'approve')
					return 
				}
			}
		}
	} 
	const onReject = () => {
		var response = window.confirm("Reject this user?");
		if (response) {
			// flip through all the different providers
			for (var idx = 0; idx < walletProviders.length; ++idx) {
				if (walletProviders[idx].id == clientType) {
					selectWalletProvider(idx, 'reject')
					return 
				}
			}
		}
	} 
    return (
        <>
        <div>
            <div>{error}</div>
            <div style={{paddingBottom:40}}>
				{user ? <div style={{display:'flex'}}><div style={{flex:1}}>{user}</div> <div><button className="small-button" onClick={()=>{
setUser(null);
setDestination(null);
setDistance(null);
					setDestinations([]);
					setFroms([]);
}}>clear</button></div></div> :
                <input type="text" onChange={(e)=>{
					setFroms(originalFroms.filter((from) => (from.user.includes(e.target.value.toLowerCase()))))
				}} placeholder="username"/>
				}
            <>{user ? null : froms.map((from, idx) => (<button className="small-button" onClick={() => {setUser(from.user)  }}>{from.status} {from.user}</button>))}</>
            </div>
            <div>
                {destination ? <div style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}> {destination.properties.formatted}</div>: <input onChange={(e)=>{
					setDestinationFilter(e.target.value)
				}} type="text" placeholder="from"/> }
            <>{destination ? null : destinations.map((from, idx) => (<button className="small-button" onClick={() => {setDestination(from)  }}>{from.properties.formatted}</button>))}</>
            </div>
			{distance ? <div>Distance: {distance} </div> : null }
			<>
			{distance && user ? (<>
				<button className="button" onClick={onApprove}>Approve</button>
				<button className="button" onClick={onReject}>Reject</button>
			</>): null }
			</>
        </div>
        </>
    )
};
export default Admin;
