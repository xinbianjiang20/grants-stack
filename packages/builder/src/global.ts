import { PublicClient } from "@wagmi/core";
import ethers from "ethers";

export interface Global {
  web3Provider: ethers.providers.Provider | undefined;
  publicClient: PublicClient | undefined;
  signer: any | undefined;
  chainID: number | undefined;
  address: string | undefined;
}

export const global: Global = {
  web3Provider: undefined,
  publicClient: undefined,
  signer: undefined,
  chainID: undefined,
  address: undefined,
};
