import { escrowDealTypes, escrowCurrencies } from "@/modules/escrow/constants";
import { enviroment, enviromentTypes } from "@/lib/constants";

export const escrowSwapOrderTypesMap = {
  [escrowDealTypes.funds_to_file]: 0,
  [escrowDealTypes.file_to_funds]: 1,
  [escrowDealTypes.funds_to_funds]: 2,
  [escrowDealTypes.file_to_file]: 3,
};

// =============================================================================

export const etheriumCurrencyAddress =
  "0x0000000000000000000000000000000000000000";

const productionCurrencyAddressesMap = {
  [escrowCurrencies.ETH]: etheriumCurrencyAddress,
  [escrowCurrencies.WBTC]: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  [escrowCurrencies.USDT]: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  [escrowCurrencies.USDC]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
};

const developmentCurrencyAddressesMap = {
  [escrowCurrencies.ETH]: etheriumCurrencyAddress,
  [escrowCurrencies.TEST_TOKEN]: "0xbFe06814858d461Ee8f3bfA38351f49c02f992Fd",
  [escrowCurrencies.UNICORN_SUPER_ROCKET_TOKEN]:
    "0x97E97d1f0Efa3933801e1a7A861CD8927112B2a2",
};

export const currencyAddressesMap =
  enviroment === enviromentTypes.production
    ? productionCurrencyAddressesMap
    : developmentCurrencyAddressesMap;

// =============================================================================

const productionEscrowCurrenciesOptions = [
  { value: escrowCurrencies.ETH, label: "ETH" },
  { value: escrowCurrencies.WBTC, label: "WBTC" },
  { value: escrowCurrencies.USDT, label: "USDT (ERC-20)" },
  { value: escrowCurrencies.USDC, label: "USDC (ERC-20)" },
];

const developmentEscrowCurrenciesOptions = [
  { value: escrowCurrencies.ETH, label: "ETH" },
  { value: escrowCurrencies.TEST_TOKEN, label: "Test Token 1" },
  {
    value: escrowCurrencies.UNICORN_SUPER_ROCKET_TOKEN,
    label: "Unicorn Super Rocket Token 🔥",
  },
];

export const escrowCurrenciesOptions =
  enviroment === enviromentTypes.production
    ? productionEscrowCurrenciesOptions
    : developmentEscrowCurrenciesOptions;
