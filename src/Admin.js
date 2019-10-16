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
const env = 'live'

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

const Admin = () => {
       const [error, setError] = useState(null);
        const doThis = async () => {
            try { 
                const walletProvider = walletProviders[1];  // hardcode tokenpocket
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
                let username = wallet.auth.accountName
                alert('yay', username)

                /*
                let wallet_result = await wallet.eosApi.transact({
                    actions: [{
                          account: bp_api[env].contract ,
                          name: 'create',
                          authorization: [{
                                        actor: username,
                                        permission: "active",
                                      }],
                          data: {user:username},
                    }],
                }, {
                        broadcast: true,
                    blocksBehind: 3, expireSeconds: 10});
                */
                return '';
            }
            catch(err) {
                    /*
                 if (err instanceof RpcError){
                     console.log(JSON.stringify(e.json, null, 2));
                 }
                 */

                //dispatch({type:'switch', payload:"error"})
                setError(err)
            }
        }
    doThis()
    var froms = []
    return (
        <>
        <div>
            <div>{error}</div>
            <h1>From</h1>
            <div style={{paddingBottom:40}}>
                <input type="text" placeholder="username"/>
            </div>
            <div>
                <input type="text" placeholder="Detroit, MI"/>
            </div>
            <>{froms.map(() => (<div onClick={() => { }}>test</div>))}</>
            <button class="button">Approve</button>
            <button class="button">Reject</button>
        </div>
        </>
    )
};
export default Admin;
