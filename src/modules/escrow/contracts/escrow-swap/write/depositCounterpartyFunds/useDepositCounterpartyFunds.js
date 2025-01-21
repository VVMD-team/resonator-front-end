import { useWriteContract } from "wagmi";
import config from "../../config";
import depositCounterpartyFundsABI, { functionName } from "./abi";

import { parseEther } from "viem";

import { sumStringIntegers } from "@/lib/helpers";

import {
  escrowCurrencies,
  maxIntegersInEscrowContractAmount,
} from "@/modules/escrow/constants";

export default function useDepositCounterpartyFunds() {
  const { data, writeContract, ...other } = useWriteContract();

  const depositCounterpartyFunds = (orderId, { amount, currency }) => {
    if (!Object.values(escrowCurrencies).includes(currency)) {
      throw new Error("Invalid currency");
    }

    const isEther = currency === escrowCurrencies.ETH;

    const valueEther = !isEther ? "0" : amount || "0";

    const value = parseEther(
      `${sumStringIntegers([valueEther], maxIntegersInEscrowContractAmount)}`
    );

    writeContract({
      ...config,
      abi: depositCounterpartyFundsABI,
      functionName,
      args: [orderId],
      value,
    });
  };

  return { data, depositCounterpartyFunds, ...other };
}
