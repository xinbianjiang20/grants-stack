import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { BigNumber, ethers } from "ethers";
import {
  ApplicationMetadata,
  IPFSObject,
  InputType,
  MatchingStatsData,
  Program,
} from "./types";
import { ChainId, RedstoneTokenIds } from "common";

// NB: number keys are coerced into strings for JS object keys
export const CHAINS: Record<ChainId, Program["chain"]> = {
  [ChainId.DEV1]: {
    id: ChainId.DEV1,
    name: "DEV1",
    logo: "/logos/ethereum-eth-logo.svg",
  },
  [ChainId.DEV2]: {
    id: ChainId.DEV2,
    name: "DEV2",
    logo: "/logos/ethereum-eth-logo.svg",
  },
  [ChainId.MAINNET]: {
    id: ChainId.MAINNET,
    name: "Mainnet", // TODO get canonical network names
    logo: "/logos/ethereum-eth-logo.svg",
  },
  [ChainId.OPTIMISM_MAINNET_CHAIN_ID]: {
    id: ChainId.OPTIMISM_MAINNET_CHAIN_ID,
    name: "Optimism",
    logo: "/logos/optimism-logo.svg",
  },
  [ChainId.FANTOM_MAINNET_CHAIN_ID]: {
    id: ChainId.FANTOM_MAINNET_CHAIN_ID,
    name: "Fantom",
    logo: "/logos/fantom-logo.svg",
  },
  [ChainId.FANTOM_TESTNET_CHAIN_ID]: {
    id: ChainId.FANTOM_TESTNET_CHAIN_ID,
    name: "Fantom Testnet",
    logo: "/logos/fantom-logo.svg",
  },
  [ChainId.PGN_TESTNET]: {
    id: ChainId.PGN_TESTNET,
    name: "PGN Testnet",
    logo: "/logos/pgn-logo.svg",
  },
  [ChainId.PGN]: {
    id: ChainId.PGN_TESTNET,
    name: "PGN",
    logo: "/logos/pgn-logo.svg",
  },
  [ChainId.ARBITRUM]: {
    id: ChainId.ARBITRUM,
    name: "Arbitrum",
    logo: "/logos/arb-logo.svg",
  },
  [ChainId.ARBITRUM_GOERLI]: {
    id: ChainId.ARBITRUM_GOERLI,
    name: "Arbitrum Goerli",
    logo: "/logos/arb-logo.svg",
  },
  [ChainId.AVALANCHE]: {
    id: ChainId.AVALANCHE,
    name: "Avalanche",
    logo: "/logos/avax-logo.svg",
  },
  [ChainId.FUJI]: {
    id: ChainId.FUJI,
    name: "Fuji (Avalanche Testnet)",
    logo: "/logos/avax-logo.svg",
  },
  [ChainId.POLYGON]: {
    id: ChainId.POLYGON,
    name: "Polygon PoS",
    logo: "./logos/pol-logo.svg",
  },
  [ChainId.POLYGON_MUMBAI]: {
    id: ChainId.POLYGON_MUMBAI,
    name: "Polygon Mumbai",
    logo: "./logos/pol-logo.svg",
  },
  [ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID]: {
    id: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    name: "zkSync Era Mainnet",
    logo: "/logos/zksync-logo.svg",
  },
  [ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID]: {
    id: ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID,
    name: "zkSync Era Testnet",
    logo: "/logos/zksync-logo.svg",
  },
};

export type PayoutToken = {
  name: string;
  chainId: number;
  address: string;
  logo?: string;
  default?: boolean; // TODO: this is only used to provide the initial placeholder item, look for better solution
  redstoneTokenId?: string;
  decimal: number;
};

export type SupportType = {
  name: string;
  regex: string;
  default: boolean;
};

export const TokenNamesAndLogos = {
  FTM: "/logos/fantom-logo.svg",
  BUSD: "/logos/busd-logo.svg",
  DAI: "/logos/dai-logo.svg",
  USDC: "./logos/usdc-logo.svg",
  ETH: "/logos/ethereum-eth-logo.svg",
  OP: "/logos/optimism-logo.svg",
  ARB: "/logos/arb-logo.svg",
  GCV: "/logos/gcv.svg",
  GTC: "/logos/gtc.svg",
  AVAX: "/logos/avax-logo.svg",
  MATIC: "/logos/pol-logo.svg",
  CVP: "/logos/power-pool.png", // PowerPool
  TEST: "/logos/dai-logo.svg",
  USDT: "/logos/usdt-logo.svg",
  LUSD: "/logos/lusd-logo.svg",
  MUTE: "/logos/mute-logo.svg",
} as const;

const MAINNET_TOKENS: PayoutToken[] = [
  {
    name: "DAI",
    chainId: ChainId.MAINNET,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
  {
    name: "ETH",
    chainId: ChainId.MAINNET,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
  {
    name: "CVP",
    chainId: ChainId.MAINNET,
    address: "0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1",
    decimal: 18,
    logo: TokenNamesAndLogos["CVP"],
    redstoneTokenId: RedstoneTokenIds["CVP"],
  },
];

const OPTIMISM_MAINNET_TOKENS: PayoutToken[] = [
  {
    name: "DAI",
    chainId: ChainId.OPTIMISM_MAINNET_CHAIN_ID,
    address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
  {
    name: "ETH",
    chainId: ChainId.OPTIMISM_MAINNET_CHAIN_ID,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
];

const FANTOM_MAINNET_TOKENS: PayoutToken[] = [
  {
    name: "WFTM",
    chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
    address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    decimal: 18,
    logo: TokenNamesAndLogos["FTM"],
    redstoneTokenId: RedstoneTokenIds["FTM"],
  },
  {
    name: "FTM",
    chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["FTM"],
    redstoneTokenId: RedstoneTokenIds["FTM"],
  },
  {
    name: "BUSD",
    chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
    address: "0xC931f61B1534EB21D8c11B24f3f5Ab2471d4aB50",
    decimal: 18,
    logo: TokenNamesAndLogos["BUSD"],
    redstoneTokenId: RedstoneTokenIds["BUSD"],
  },
  {
    name: "DAI",
    chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
    address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
  {
    name: "GcV",
    chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
    address: "0x83791638da5EB2fAa432aff1c65fbA47c5D29510",
    decimal: 18,
    logo: TokenNamesAndLogos["GCV"],
    redstoneTokenId: RedstoneTokenIds["DAI"], // We use DAI for the price
  },
];

const FANTOM_TESTNET_TOKENS: PayoutToken[] = [
  {
    name: "DAI",
    chainId: ChainId.FANTOM_TESTNET_CHAIN_ID,
    address: "0xEdE59D58d9B8061Ff7D22E629AB2afa01af496f4",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
  {
    name: "FTM",
    chainId: ChainId.FANTOM_TESTNET_CHAIN_ID,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["FTM"],
    redstoneTokenId: RedstoneTokenIds["FTM"],
  },
];

const ZKSYNC_ERA_TESTNET_TOKENS: PayoutToken[] = [
  {
    name: "ETH",
    chainId: ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
  {
    name: "TEST",
    chainId: ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID,
    address: "0x8fd03Cd97Da068CC242Ab7551Dc4100DD405E8c7",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
];

const ZKSYNC_ERA_MAINNET_TOKENS: PayoutToken[] = [
  {
    name: "ETH",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
  {
    name: "DAI",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: "0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
  {
    name: "USDC",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
  {
    name: "USDT",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",
    decimal: 6,
    logo: TokenNamesAndLogos["USDT"],
    redstoneTokenId: RedstoneTokenIds["USDT"],
  },
  {
    name: "LUSD",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    decimal: 18,
    logo: TokenNamesAndLogos["LUSD"],
    redstoneTokenId: RedstoneTokenIds["LUSD"],
  },
  {
    name: "MUTE",
    chainId: ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID,
    address: "0x0e97C7a0F8B2C9885C8ac9fC6136e829CbC21d42",
    decimal: 18,
    logo: TokenNamesAndLogos["MUTE"],
    redstoneTokenId: RedstoneTokenIds["MUTE"],
  },
];

const PGN_TESTNET_TOKENS: PayoutToken[] = [
  {
    name: "TEST",
    chainId: ChainId.PGN_TESTNET,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    logo: TokenNamesAndLogos["DAI"],
    decimal: 18,
  },
  {
    name: "ETH",
    chainId: ChainId.PGN_TESTNET,
    address: ethers.constants.AddressZero,
    logo: TokenNamesAndLogos["ETH"],
    decimal: 18,
  },
];

const PGN_MAINNET_TOKENS: PayoutToken[] = [
  {
    name: "ETH",
    chainId: ChainId.PGN,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
  {
    name: "GTC",
    chainId: ChainId.PGN,
    address: "0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2",
    decimal: 18,
    logo: TokenNamesAndLogos["GTC"],
    redstoneTokenId: RedstoneTokenIds["GTC"],
  },
  {
    name: "DAI",
    chainId: ChainId.PGN,
    address: "0x6C121674ba6736644A7e73A8741407fE8a5eE5BA",
    decimal: 18,
    logo: TokenNamesAndLogos["DAI"],
    redstoneTokenId: RedstoneTokenIds["DAI"],
  },
];

const ARBITRUM_GOERLI_TOKENS: PayoutToken[] = [
  {
    name: "ETH",
    chainId: ChainId.ARBITRUM_GOERLI,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
];

const ARBITRUM_TOKENS: PayoutToken[] = [
  {
    name: "ETH",
    chainId: ChainId.ARBITRUM,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["ETH"],
    redstoneTokenId: RedstoneTokenIds["ETH"],
  },
  {
    name: "USDC",
    chainId: ChainId.ARBITRUM,
    address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
  {
    name: "ARB",
    chainId: ChainId.ARBITRUM,
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    decimal: 18,
    logo: TokenNamesAndLogos["ARB"],
    redstoneTokenId: RedstoneTokenIds["ARB"],
  },
];

const AVALANCHE_TOKENS: PayoutToken[] = [
  {
    name: "AVAX",
    chainId: ChainId.AVALANCHE,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["AVAX"],
    redstoneTokenId: RedstoneTokenIds["AVAX"],
  },
  {
    name: "USDC",
    chainId: ChainId.AVALANCHE,
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
];

const FUJI_TOKENS: PayoutToken[] = [
  {
    name: "AVAX",
    chainId: ChainId.FUJI,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["AVAX"],
    redstoneTokenId: RedstoneTokenIds["AVAX"],
  },
  {
    name: "USDC",
    chainId: ChainId.FUJI,
    address: "0x5425890298aed601595a70ab815c96711a31bc65",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
];

const POLYGON_TOKENS: PayoutToken[] = [
  {
    name: "MATIC",
    chainId: ChainId.POLYGON,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["MATIC"],
    redstoneTokenId: RedstoneTokenIds["MATIC"],
  },
  {
    name: "USDC",
    chainId: ChainId.POLYGON,
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
];

const POLYGON_MUMBAI_TOKENS: PayoutToken[] = [
  {
    name: "MATIC",
    chainId: ChainId.POLYGON_MUMBAI,
    address: ethers.constants.AddressZero,
    decimal: 18,
    logo: TokenNamesAndLogos["MATIC"],
    redstoneTokenId: RedstoneTokenIds["MATIC"],
  },
  {
    name: "USDC",
    chainId: ChainId.POLYGON_MUMBAI,
    address: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
    decimal: 6,
    logo: TokenNamesAndLogos["USDC"],
    redstoneTokenId: RedstoneTokenIds["USDC"],
  },
];

export const payoutTokens = [
  ...MAINNET_TOKENS,
  ...OPTIMISM_MAINNET_TOKENS,
  ...FANTOM_MAINNET_TOKENS,
  ...FANTOM_TESTNET_TOKENS,
  ...PGN_TESTNET_TOKENS,
  ...PGN_MAINNET_TOKENS,
  ...ARBITRUM_TOKENS,
  ...ARBITRUM_GOERLI_TOKENS,
  ...AVALANCHE_TOKENS,
  ...FUJI_TOKENS,
  ...POLYGON_TOKENS,
  ...POLYGON_MUMBAI_TOKENS,
  ...ZKSYNC_ERA_MAINNET_TOKENS,
  ...ZKSYNC_ERA_TESTNET_TOKENS,
];

/*TODO: merge this and the above into one list / function*/
export const getPayoutTokenOptions = (chainId: ChainId): PayoutToken[] => {
  switch (chainId) {
    default:
    case ChainId.MAINNET: {
      return [
        {
          name: "DAI",
          chainId: ChainId.MAINNET,
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          logo: TokenNamesAndLogos["DAI"],
          decimal: 18,
        },
        {
          name: "ETH",
          chainId: ChainId.MAINNET,
          address: ethers.constants.AddressZero,
          logo: TokenNamesAndLogos["ETH"],
          decimal: 18,
        },
        {
          name: "CVP",
          chainId: ChainId.MAINNET,
          address: "0x38e4adB44ef08F22F5B5b76A8f0c2d0dCbE7DcA1",
          decimal: 18,
          logo: TokenNamesAndLogos["CVP"],
          redstoneTokenId: RedstoneTokenIds["CVP"],
        },
      ];
    }
    case ChainId.OPTIMISM_MAINNET_CHAIN_ID: {
      return [
        {
          name: "DAI",
          chainId: ChainId.OPTIMISM_MAINNET_CHAIN_ID,
          address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
          logo: TokenNamesAndLogos["DAI"],
          decimal: 18,
        },
        {
          name: "ETH",
          chainId: ChainId.OPTIMISM_MAINNET_CHAIN_ID,
          address: ethers.constants.AddressZero,
          logo: TokenNamesAndLogos["ETH"],
          decimal: 18,
        },
      ];
    }
    case ChainId.FANTOM_MAINNET_CHAIN_ID: {
      return [
        {
          name: "WFTM",
          chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
          address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
          logo: TokenNamesAndLogos["FTM"],
          decimal: 18,
        },
        {
          name: "FTM",
          chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
          address: ethers.constants.AddressZero,
          logo: TokenNamesAndLogos["FTM"],
          decimal: 18,
        },
        {
          name: "BUSD",
          chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
          address: "0xC931f61B1534EB21D8c11B24f3f5Ab2471d4aB50",
          logo: TokenNamesAndLogos["BUSD"],
          decimal: 18,
        },
        {
          name: "DAI",
          chainId: ChainId.FANTOM_MAINNET_CHAIN_ID,
          address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
          logo: TokenNamesAndLogos["DAI"],
          decimal: 18,
        },
      ];
    }
    case ChainId.FANTOM_TESTNET_CHAIN_ID: {
      return [
        {
          name: "DAI",
          chainId: ChainId.FANTOM_TESTNET_CHAIN_ID,
          address: "0xEdE59D58d9B8061Ff7D22E629AB2afa01af496f4",
          logo: TokenNamesAndLogos["DAI"],
          decimal: 18,
        },
      ];
    }
    case ChainId.PGN_TESTNET:
      return [
        {
          name: "TEST",
          chainId: ChainId.PGN_TESTNET,
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          logo: TokenNamesAndLogos["DAI"],
          decimal: 18,
        },
        {
          name: "ETH",
          chainId: ChainId.PGN_TESTNET,
          address: ethers.constants.AddressZero,
          logo: TokenNamesAndLogos["ETH"],
          decimal: 18,
        },
      ];
    case ChainId.PGN:
      return PGN_MAINNET_TOKENS;

    case ChainId.ARBITRUM_GOERLI:
      return payoutTokens.filter(
        (token) => token.chainId === ChainId.ARBITRUM_GOERLI
      );

    case ChainId.ARBITRUM:
      return payoutTokens.filter((token) => token.chainId === ChainId.ARBITRUM);

    case ChainId.POLYGON:
      return payoutTokens.filter((token) => token.chainId === ChainId.POLYGON);

    case ChainId.POLYGON_MUMBAI:
      return payoutTokens.filter(
        (token) => token.chainId === ChainId.POLYGON_MUMBAI
      );

    case ChainId.AVALANCHE:
      return payoutTokens.filter(
        (token) => token.chainId === ChainId.AVALANCHE
      );

    case ChainId.FUJI:
      return payoutTokens.filter((token) => token.chainId === ChainId.FUJI);

    case ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID:
      return payoutTokens.filter(
        (token) => token.chainId === ChainId.ZKSYNC_ERA_MAINNET_CHAIN_ID
      );

    case ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID:
      return payoutTokens.filter(
        (token) => token.chainId === ChainId.ZKSYNC_ERA_TESTNET_CHAIN_ID
      );
  }
};
/**
 * Fetch data from IPFS
 * TODO: include support for fetching abitrary data e.g images
 *
 * @param cid - the unique content identifier that points to the data
 */
export const fetchFromIPFS = (cid: string) => {
  return fetch(
    `https://${process.env.REACT_APP_PINATA_GATEWAY}/ipfs/${cid}`
  ).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp);
  });
};

/**
 * Pin data to IPFS
 * The data could either be a file or a JSON object
 *
 * @param obj - the data to be pinned on IPFS
 * @returns the unique content identifier that points to the data
 */
export const pinToIPFS = (obj: IPFSObject): Promise<{ IpfsHash: string }> => {
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
    },
    body: {
      pinataMetadata: obj.metadata,
      pinataOptions: {
        cidVersion: 1,
      },
    },
  };

  /* typeof Blob === 'object', so we need to check against instanceof */
  if (obj.content instanceof Blob) {
    // content is a blob
    const fd = new FormData();
    fd.append("file", obj.content as Blob);
    fd.append("pinataOptions", JSON.stringify(params.body.pinataOptions));
    fd.append("pinataMetadata", JSON.stringify(params.body.pinataMetadata));

    return fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      ...params,
      body: fd,
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
    });
  } else {
    // content is a JSON object
    return fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      ...params,
      headers: {
        ...params.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...params.body, pinataContent: obj.content }),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
    });
  }
};

export const abbreviateAddress = (address: string) =>
  `${address.slice(0, 8)}...${address.slice(-4)}`;

export interface SchemaQuestion {
  id: number;
  title: string;
  type: InputType;
  required: boolean;
  hidden: boolean;
  choices?: string[];
  encrypted: boolean;
  fixed?: boolean;
  metadataExcluded?: boolean;
}

export interface ProjectRequirementsSchema {
  twitter: {
    required: boolean;
    verification: boolean;
  };
  github: {
    required: boolean;
    verification: boolean;
  };
}

export interface ApplicationSchema {
  questions: Array<SchemaQuestion>;
  requirements: ProjectRequirementsSchema;
}

/**
 * This function generates the round application schema to be stored in a decentralized storage
 *
 * @param questions - The metadata of a round application
 * @param requirements
 * @returns The application schema
 */
export const generateApplicationSchema = (
  questions: ApplicationMetadata["questions"],
  requirements: ApplicationMetadata["requirements"]
): ApplicationSchema => {
  const schema = { questions: new Array<SchemaQuestion>(), requirements };
  if (!questions) return schema;

  schema.questions = questions
    .filter((q) => !q.metadataExcluded)
    .map((question, index) => {
      return {
        id: index,
        title: question.title,
        type: question.type,
        required: question.required,
        info: "",
        choices: question.choices,
        hidden: question.hidden,
        encrypted: question.encrypted,
      };
    });

  return schema;
};

export function typeToText(s: string) {
  if (s == "address") return "Wallet address";
  if (s == "checkbox") return "Checkboxes";
  return (s.charAt(0).toUpperCase() + s.slice(1)).replace("-", " ");
}

/**
 * Fetch link to contract on Etherscan or other explorer
 *
 * @param chainId - The chain ID of the blockchain
 * @param contractAddress - The address of the contract
 * @returns The link to the contract on Etherscan or other
 * explorer for the given chain ID and contract address
 */
export const getTxExplorerForContract = (
  chainId: ChainId,
  contractAddress: string
) => {
  switch (chainId) {
    case ChainId.OPTIMISM_MAINNET_CHAIN_ID:
      return `https://optimistic.etherscan.io/address/${contractAddress}`;

    case ChainId.FANTOM_MAINNET_CHAIN_ID:
      return `https://ftmscan.com/address/${contractAddress}`;

    case ChainId.FANTOM_TESTNET_CHAIN_ID:
      return `https://testnet.ftmscan.com/address/${contractAddress}`;

    case ChainId.MAINNET:
      return `https://etherscan.io/address/${contractAddress}`;
  }
};
/**
 * Generate merkle tree
 *
 * To get merkle Proof: tree.getProof(distributions[0]);
 * @param matchingResults MatchingStatsData[]
 * @returns
 */
export const generateMerkleTree = (
  matchingResults: MatchingStatsData[]
): {
  distribution: [number, string, BigNumber, string][];
  tree: StandardMerkleTree<[number, string, BigNumber, string]>;
  matchingResults: MatchingStatsData[];
} => {
  const distribution: [number, string, BigNumber, string][] = [];

  matchingResults.forEach((matchingResult, index) => {
    matchingResults[index].index = index;

    distribution.push([
      index,
      matchingResult.projectPayoutAddress,
      matchingResult.matchAmountInToken, // TODO: FIX
      matchingResult.projectId,
    ]);
  });

  const tree = StandardMerkleTree.of(distribution, [
    "uint256",
    "address",
    "uint256",
    "bytes32",
  ]);

  return { distribution, tree, matchingResults };
};

export const formatCurrency = (
  value: BigNumber,
  decimal: number,
  fraction?: number
) => {
  return parseFloat(
    ethers.utils.formatUnits(value.toString(), decimal)
  ).toLocaleString("en-US", {
    maximumFractionDigits: fraction || 3,
  });
};
