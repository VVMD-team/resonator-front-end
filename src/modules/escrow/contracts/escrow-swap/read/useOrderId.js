import { useEffect, useState } from "react";

import { useTransactionReceipt } from "wagmi";
import { Interface } from "ethers";

import escrowSwapAbiFull from "../abiFull";

export default function useOrderId(hash) {
  const [orderId, setOrderId] = useState(0);

  const result = useTransactionReceipt({ hash });

  useEffect(() => {
    if (!result?.data?.logs) return;
    const logs = result?.data?.logs;

    const contractInterface = new Interface(escrowSwapAbiFull);

    for (const log of logs) {
      try {
        const decodedLog = contractInterface.parseLog(log);

        if (decodedLog.name === "OrderPlaced") {
          const id = decodedLog.args[0].toString();
          setOrderId(id);
        }
      } catch (error) {
        console.error("Log does not match the ABI, skipping...");
      }
    }
  }, [result]);

  return orderId;
}
