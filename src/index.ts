import TrezorConnect from 'trezor-connect';
import Web3ProviderEngine from 'web3-provider-engine';
// @ts-ignore
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js';
import { TrezorSubprovider } from '@0x/subproviders/lib/src/subproviders/trezor';
import { RPCSubprovider } from '@0x/subproviders/lib/src/subproviders/rpc_subprovider';

export interface ITrezorConnectorOptions {
  manifestEmail: string;
  manifestAppUrl: string;
  rpcUrl: string;
  config?: any;
  pollingInterval?: any;
  requestTimeoutMs?: any;
}

class TrezorProvider extends Web3ProviderEngine {
  constructor(opts: ITrezorConnectorOptions) {
    super({
      pollingInterval: opts.pollingInterval,
    });
    TrezorConnect.manifest({
      email: opts.manifestEmail,
      appUrl: opts.manifestAppUrl,
    });
    this.addProvider(
      new TrezorSubprovider({
        trezorConnectClientApi: TrezorConnect,
        ...opts.config,
      })
    );
    this.addProvider(new CacheSubprovider());
    this.addProvider(new RPCSubprovider(opts.rpcUrl, opts.requestTimeoutMs));

    this.start();
  }
}

export default TrezorProvider;
