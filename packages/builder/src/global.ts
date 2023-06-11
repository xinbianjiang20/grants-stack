import { PublicClient, WalletClient, Chain } from "@wagmi/core";
import ethers from "ethers";

export interface Global {
  web3Provider: ethers.providers.Provider | undefined;
  publicClient: PublicClient | undefined;
  walletClient: WalletClient | undefined;
  signer: any | undefined;
  chain: Chain | undefined;
  address: string | undefined;
}

export const global: Global = {
  web3Provider: undefined,
  publicClient: undefined,
  walletClient: undefined,
  signer: undefined,
  chain: undefined,
  address: undefined,
};
