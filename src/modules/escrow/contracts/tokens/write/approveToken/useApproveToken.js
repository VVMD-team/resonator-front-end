import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import {
  walletBalanceCurrencies,
  tokenAddresesMap,
  tokenApprovalAbisMap,
} from "@/lib/constants";

import { ethers } from "ethers";

import config from "@/modules/escrow/contracts/escrow-swap/config";

export default function useApproveToken() {
  const { data, writeContract, error } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
    confirmations: 1,
  });

  const approveToken = async (token, amount) => {
    const amountUint256Str = ethers
      .parseUnits(amount.toString(), 18)
      .toString();

    writeContract({
      address: tokenAddresesMap[token],
      abi: tokenApprovalAbisMap[token],
      functionName: "approve",
      args: [config.address, amountUint256Str],
    });
  };

  return { approveToken, isLoading, isSuccess, error };
}
