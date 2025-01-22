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
    const decimals = token === walletBalanceCurrencies.WBTC ? 8 : 6;
    const amountInSmallestUnit = ethers.parseUnits(amount.toString(), decimals);

    writeContract({
      address: tokenAddresesMap[token],
      abi: tokenApprovalAbisMap[token],
      functionName: "approve",
      args: [config.address, amountInSmallestUnit],
    });
  };

  return { approveToken, isLoading, isSuccess, error };
}
