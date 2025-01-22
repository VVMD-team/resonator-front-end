import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { parseEther } from "viem";
import config from "../../config";
import mapInputData from "./mapper";
import placeOrderABI, { functionName } from "./abi";

import {
  escrowContractFee,
  maxIntegersInEscrowContractAmount,
  escrowCurrencies,
} from "@/modules/escrow/constants";
import { sumStringIntegers } from "@/lib/helpers";

export default function usePlaceOrder() {
  const { data, writeContract, writeContractAsync, ...other } =
    useWriteContract();

  const placeOrder = async (data, settings = { extraFee: "0" }) => {
    const args = mapInputData(data);

    const providedPayment = data?.providedPayment;
    const currency = providedPayment?.currency;
    const amount = providedPayment?.amount;

    const isEther = currency === escrowCurrencies.ETH;

    const valueEther = !isEther ? "0" : amount || "0";

    const value = parseEther(
      `${sumStringIntegers(
        [escrowContractFee, valueEther, settings.extraFee],
        maxIntegersInEscrowContractAmount
      )}`
    );

    writeContract({
      ...config,
      abi: placeOrderABI,
      functionName,
      args,
      value,
    });
  };

  return { data, placeOrder, ...other };
}
