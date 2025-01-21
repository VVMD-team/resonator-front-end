import { useReadContract } from "wagmi";

import config from "../../config";
import ordersABI, { functionName } from "./abi";
import mapOrderData from "./mapper";

export default function useOrderData(orderId, settings = {}) {
  const { data, ...other } = useReadContract({
    ...config,
    abi: ordersABI,
    functionName,
    args: [orderId],
    ...settings,
  });

  const orderData = data ? mapOrderData(data) : null;

  return { orderData, ...other };
}
