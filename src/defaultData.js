import { initAccessContext } from 'eos-transit';
import scatter from 'eos-transit-scatter-provider';
import stub from 'eos-transit-stub-provider';

export const accessContext = initAccessContext({
	appName: 'trf-web',
	network: {
		host: 'eos.greymass.com',
		port: 443,
		protocol: 'https',
		chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
	},
	walletProviders: [
		scatter(),
		stub({
			id: 'some_provider_id',
			name: 'My Super Cool Wallet Provider',
			shortName: 'My Provider Test',
			description: 'Some description here, might be shown on the UI, etc',
			errorTimeout: 3000 // milliseconds before connect/login error, defaults to 2500
		})
	]
});
export const walletProviders = accessContext.getWalletProviders();
