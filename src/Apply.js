import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import scatter from 'eos-transit-scatter-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';
import lynxWalletProvider from 'eos-transit-lynx-provider';
import { initAccessContext } from 'eos-transit';

// This should probably be commonly held somewhere rather than here..

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
const walletProvidersArray = accessContext.getWalletProviders();
var walletProviders = {
    'scatter' : walletProvidersArray[0],
    'tp' : walletProvidersArray[1],
    'lynx' : walletProvidersArray[2],
}

const Apply = (props) => {
    const dispatch = useDispatch()
    const recordError = (err, stage) => {
        if (err.message) {
            let error = {
                code: err.code,
                message: err.message,
                stage: stage
            }
            dispatch({type:'error', payload:error})
        } else {
            let error = {
                code: 'generic',
                message: err,
                stage: stage
            }
            dispatch({type:'error', payload:error})
        }
        return null
    }
    const selectWalletProvider =  async (walletType) => {
        const walletProvider = walletProviders[walletType];
        const wallet = accessContext.initWallet(walletProvider);
        dispatch({type:'switch', payload: 'Wallet initialized...'})
        let connect_response = null
        try {
            connect_response = await wallet.connect()
        } catch(err) {
            return recordError(err, 'discovering');
        }
        dispatch({type:'switch', payload: 'Connected...'})
        let discoveringData = null
        try {
            discoveringData = await wallet.discover({ pathIndexList: [ 0,1,2,3 ] })
        } catch(err) {
            return recordError(err, 'discovering');
        }
        if (!discoveringData || !discoveringData.keyToAccountMap) {
            return recordError("No data", 'keyToAccountMap');
        }
        let accountInfo = null
        if (discoveringData.keyToAccountMap.length > 0) {
            dispatch({type:'switch', payload:'Discovery complete...'})
            // @todo(seth): should allow selection
            const index = 0;
            const keyObj = discoveringData.keyToAccountMap[index];
            console.log('discovering, keyObj', keyObj)
            const accountName = keyObj.accounts[0].account;
            const authorization = keyObj.accounts[0].authorization;
            try { 
                accountInfo = await wallet.login(accountName, authorization)
            } catch(err) {
                return recordError(err, 'logging in after discovering');
            }
        } 
        else { // discovering not supported (scatter for example)
            dispatch({type:'switch', payload:'Logging in...'})
            try { 
                accountInfo = await wallet.login()
            } catch(err) {
                return recordError(err, 'logging in');
            }
        }
        // logged in
        if (!accountInfo) {
            return recordError("Not logged in", 'verifying account info entered')
        }
        let username = wallet.auth.accountName

        dispatch({type:'switch', payload:'Submitting to blockchain...'})
        try {
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
        } catch(err) {
            return recordError("Make sure you press confirm", 'submitting');
            // they can't handle the real error
            // TypeError: undefined is not iteratble
            //return recordError(err, 'eos api transact');
        }
        dispatch({type:'switch', payload:'done'})
    };
    const {walletType, walletName} = props;
    return <button className="button" onClick={() => { selectWalletProvider(walletType)}}>APPLY USING {walletName}</button>

}

export default Apply;
