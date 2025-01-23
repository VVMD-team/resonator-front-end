import { ethers } from "ethers";

import { escrowCurrencies } from "@/modules/escrow/constants";

export const formatAmount = (amount, currency) => {
  const decimals =
    currency === escrowCurrencies.ETH
      ? 16
      : currency === escrowCurrencies.WBTC
      ? 8
      : 6;

  return ethers.parseUnits(amount.toString(), decimals).toString();
};
