import { useWriteContract } from "wagmi";
import config from "../../config";
import confirmOrderWithoutFundsABI, { functionName } from "./abi";

export default function useConfirmOrderWithoutFunds() {
  const { data, writeContract, ...other } = useWriteContract();

  const confirmOrderWithoutFunds = (orderId) => {
    writeContract({
      ...config,
      abi: confirmOrderWithoutFundsABI,
      functionName,
      args: [orderId],
    });
  };

  return { data, confirmOrderWithoutFunds, ...other };
}
