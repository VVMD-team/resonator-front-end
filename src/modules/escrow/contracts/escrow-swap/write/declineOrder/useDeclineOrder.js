import { useWriteContract } from "wagmi";
import config from "../../config";
import declineOrderABI, { functionName } from "./abi";

export default function useDeclineOrder() {
  const { data, writeContract, ...other } = useWriteContract();

  const declineOrder = (orderId) => {
    writeContract({
      ...config,
      abi: declineOrderABI,
      functionName,
      args: [orderId],
    });
  };

  return { data, declineOrder, ...other };
}
