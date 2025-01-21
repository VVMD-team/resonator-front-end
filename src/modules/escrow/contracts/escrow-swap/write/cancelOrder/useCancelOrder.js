import { useWriteContract } from "wagmi";
import config from "../../config";
import cancelOrderABI, { functionName } from "./abi";

export default function useCancelOrder() {
  const { data, writeContract, ...other } = useWriteContract();

  const cancelOrder = async (orderId) => {
    writeContract({
      ...config,
      abi: cancelOrderABI,
      functionName,
      args: [orderId],
    });
  };

  return { data, cancelOrder, ...other };
}
