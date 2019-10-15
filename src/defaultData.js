import { initAccessContext } from 'eos-transit';
import scatter from 'eos-transit-scatter-provider';
import tokenpocket from 'eos-transit-tokenpocket-provider';
import lynxWalletProvider from 'eos-transit-lynx-provider';

export const accessContext = initAccessContext({
	appName: 'trf-web',
	network: {
		/*host: 'eos.greymass.com',*/
		host: 'jungle2.cryptolions.io',
		port: 443,
		protocol: 'https',
		/*chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'*/
		chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
	},
	walletProviders: [
		scatter(),
        tokenpocket(),
        lynxWalletProvider()

	]
});
export const walletProviders = accessContext.getWalletProviders();
