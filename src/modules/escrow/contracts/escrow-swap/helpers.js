import { ethers } from "ethers";

export const formatAmount = (amount) => {
  const decimals = 18;

  return ethers.parseUnits(amount, decimals).toString();
};
