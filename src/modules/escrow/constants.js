import { enviroment, enviromentTypes } from "@/lib/constants";

export const escrowStatuses = {
  in_progress: "in_progress",
  completed: "completed",
  canceled_by_owner: "canceled_by_owner",
  canceled_by_counterparty: "canceled_by_counterparty",
  expired: "expired",
};

export const escrowContractStatuses = {
  Pending: "Pending",
  Approved: "Approved",
  Declined: "Declined",
  Completed: "Completed",
};

export const escrowContractStatusesMap = {
  0: escrowContractStatuses.Pending,
  1: escrowContractStatuses.Approved,
  2: escrowContractStatuses.Declined,
  3: escrowContractStatuses.Completed,
};

export const escrowStatusesUIDataMap = {
  [escrowStatuses.in_progress]: {
    title: "In Progress",
    color: "#52ff5d",
  },
  [escrowStatuses.completed]: {
    title: "Completed",
    color: "#9d9d9d",
  },
  [escrowStatuses.canceled_by_owner]: {
    title: "Canceled",
    color: "#ff5252",
  },
  [escrowStatuses.canceled_by_counterparty]: {
    title: "Canceled",
    color: "#ff5252",
  },
  [escrowStatuses.expired]: {
    title: "Expired",
    color: "#ff5252",
  },
};

export const escrowDealTypes = {
  file_to_funds: "file_to_funds",
  funds_to_file: "funds_to_file",
  file_to_file: "file_to_file",
  funds_to_funds: "funds_to_funds",
};

const productionEscrowCurrencies = {
  ETH: "ETH",
  WBTC: "WBTC",
  USDT: "USDT",
  USDC: "USDC",
};

const developmentEscrowCurrencies = {
  ETH: "ETH",
  TEST_TOKEN: "TEST_TOKEN",
  UNICORN_SUPER_ROCKET_TOKEN: "UNICORN_SUPER_ROCKET_TOKEN",
};

export const escrowCurrencies =
  enviroment === enviromentTypes.production
    ? productionEscrowCurrencies
    : developmentEscrowCurrencies;

export const escrowSelects = {
  FILE: "FILE",
  FUNDS: "FUNDS",
};

export const escrowContractFee = "0.01";
export const fileToFileExtraFee = "0";

export const maxIntegersInEscrowContractAmount = 6;
