import { Chain, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains } from "wagmi";

import {
  mainnet,
  optimism,
  hardhat,
  fantom,
  fantomTestnet,
  goerli,
} from "viem/chains";

import { publicProvider } from "wagmi/providers/public";

import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";

const getEnv = (name: string): string => {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`missing env var ${name}`);
  }
  return value;
};

const alchemyId = getEnv("REACT_APP_ALCHEMY_ID");
const infuraId = getEnv("REACT_APP_INFURA_ID");

const chainsAvailable: Chain[] = [];

if (process.env.REACT_APP_LOCALCHAIN) {
  chainsAvailable.push(hardhat);
}

if (process.env.REACT_APP_ENV === "production") {
  chainsAvailable.push(mainnet, fantom, optimism);
} else {
  chainsAvailable.push(optimism, goerli, fantomTestnet, fantom, mainnet);
}

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  chainsAvailable,
  [
    infuraProvider({
      apiKey: infuraId!,
    }),
    alchemyProvider({
      apiKey: alchemyId!,
    }),
    publicProvider(),
  ]
);

// Custom wallet connectors: more can be added by going here:
// https://www.rainbowkit.com/docs/custom-wallet-list
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({ appName: "Builder", chains }),
      metaMaskWallet({ chains }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default config;
