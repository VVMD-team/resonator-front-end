export const walletTypes = {
  METAMASK: "METAMASK",
  TRUST_WALLET: "TRUST_WALLET",
  // PHANTOM: "PHANTOM",
  RABBY_WALLET: "RABBY_WALLET",
};

export const etheriumWallets = [
  walletTypes.METAMASK,
  walletTypes.TRUST_WALLET,
  walletTypes.RABBY_WALLET,
];

export const walletBalanceCurrencies = {
  RSN: "RSN",
  ETH: "ETH",
  WBTC: "WBTC",
  USDT: "USDT",
  USDC: "USDC",
};

export const tokenAddresesMap = {
  [walletBalanceCurrencies.ETH]: null,
  [walletBalanceCurrencies.WBTC]: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  [walletBalanceCurrencies.USDT]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  [walletBalanceCurrencies.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

export const tokenApprovalAbisMap = {
  [walletBalanceCurrencies.WBTC]: [
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  [walletBalanceCurrencies.USDT]: [
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  [walletBalanceCurrencies.USDC]: [
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const solanaWallets = [walletTypes.PHANTOM];

export const authMessage =
  "Please sign this message to authenticate with our service.";

export const defaultDuration = 0.35; // seconds

export const enviromentTypes = {
  production: "production",
  development: "development",
  local: "local",
};
export const enviroment = process.env.NEXT_PUBLIC_APP_ENVIRONMENT;

export const { apiUrl, wsUrl } = (() => {
  switch (enviroment) {
    case enviromentTypes.production:
      return {
        // apiUrl: "https://dapp-resonator-back-end.vercel.app",
        apiUrl: "https://resonator.ngrok.io",
        wsUrl: "wss://resonator.ngrok.io",
      };
    case enviromentTypes.development:
      return {
        apiUrl: "https://resonator-back-end-staging.up.railway.app",
        wsUrl: "wss://resonator-back-end-staging.up.railway.app",
      };
    case enviromentTypes.local:
      return { apiUrl: "http://localhost:8000", wsUrl: "ws://localhost:8000" };
    default:
      throw new Error("Invalid enviroment");
  }
})();

export const filesEndpoint = "/files";
export const userDataEndpoint = "/user";
export const balanceEndpoint = "/user/balance";
export const boxEndpoint = "/box";
export const createBoxEndpoint = "/box/create";
export const boxFilesEndpoint = "/box-files";
export const escrowEndpoint = "/escrow";
export const notificationsEndpoint = "/notifications";

export const authTokenStorageKey = "auth_token";

export const notificationTypes = {
  escrow: "escrow",
};
