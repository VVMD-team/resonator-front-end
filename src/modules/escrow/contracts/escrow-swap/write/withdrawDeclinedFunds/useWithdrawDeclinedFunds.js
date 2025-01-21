import { useWriteContract } from "wagmi";
import config from "../../config";
import withdrawDeclinedFundsABI, { functionName } from "./abi";

export default function useWithdrawDeclinedFunds() {
  const { data, writeContract, ...other } = useWriteContract();

  const withdrawDeclinedFunds = (orderId) => {
    writeContract({
      ...config,
      abi: withdrawDeclinedFundsABI,
      functionName,
      args: [orderId],
    });
  };

  return { data, withdrawDeclinedFunds, ...other };
}
