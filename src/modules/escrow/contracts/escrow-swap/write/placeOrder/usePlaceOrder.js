import { useWriteContract } from "wagmi";
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
  const { data, writeContract, ...other } = useWriteContract();

  const placeOrder = (data, settings = { extraFee: "0" }) => {
    const args = mapInputData(data);

    const isEther = data?.providedPayment?.currency === escrowCurrencies.ETH;

    const valueEther = !isEther ? "0" : data?.providedPayment?.amount || "0";

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
