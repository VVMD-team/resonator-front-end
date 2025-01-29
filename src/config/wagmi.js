import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mainnet, bscTestnet } from "wagmi/chains";

import { enviroment, enviromentTypes } from "@/lib/constants";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

const featuredWalletIds = [
  "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
];

const excludeWalletIds = [
  "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709", //okx
  "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", //bitget
  "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
  "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
  "0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150",
  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  "15c8b91ade1a4e58f3ce4e7a0dd7f42b47db0c8df7e0d84f63eb39bcb96c4e0f",
  "19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",
  "344d0e58b139eb1b6da0c29ea71d52a8eace8b57897c6098cb9b46012665c193",
  "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
  "c286eebc742a537cd1d6818363e9dc53b21759a1e8e5d9b263d0c03ec7703576",
  "f2436c67184f158d1beda5df53298ee84abfc367581e4505134b5bcf5f46697d",
  "18450873727504ae9315a084fa7624b5297d2fe5880f0982979c17345a138277",
  "8837dd9413b1d9b585ee937d27a816590248386d9dbf59f5cd3422dbbb65683e",
  "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
  "c87c562ce7f3a3ff9f4eed5f5a0edbcbd812db5aed4d14c7e6c044d8b6795d84",
  "163d2cf19babf05eb8962e9748f9ebe613ed52ebf9c8107c9a0f104bfcf161b3",
  "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",
  "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1", // rabby wallet
];

const metadata = {
  name: "Dapp resonator",
  description: "Dapp resonator",
  url: "https://dapp.rsntr.io/",
  icons: [
    "https://cdn.prod.website-files.com/6718fd0cca76b8cb98982ac7/671a2770a1409fcc73ac97a3_logo-square.svg",
  ],
};

const productionChains = [mainnet];
const developmentChains = [bscTestnet];
const chains =
  enviroment === enviromentTypes.production
    ? productionChains
    : developmentChains;

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: false,
    socials: [],
    showWallets: false,
    walletFeatures: false,
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const web3ModalConfig = {
  metadata,
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  allWallets: "HIDE",
  featuredWalletIds,
  excludeWalletIds,
  themeVariables: {
    "--w3m-font-family": "Helvetica Now Display, sans-serif",
    "--w3m-border-radius-master": "1.5rem",
    "--w3m-z-index": 100,
  },
};
