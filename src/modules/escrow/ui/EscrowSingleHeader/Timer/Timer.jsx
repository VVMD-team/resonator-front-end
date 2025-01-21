"use client";

import styles from "./Timer.module.css";

import { useEffect, useState } from "react";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import {
  useOrderData,
  useOrderId,
} from "@/modules/escrow/contracts/escrow-swap/read";

import {
  countdownToTimestamp,
  countdownToTimestampErrorMessage,
} from "@/lib/helpers";

import { expireEscrow } from "@/modules/escrow/api";

export default function Timer() {
  const [remainingTime, setRemainingTime] = useState("");

  const { escrow, updateEscrow } = useEscrowSingle();
  const orderContractId = useOrderId(escrow.contractOrderHash);

  const { orderData, isPending, error } = useOrderData(orderContractId, {
    enabled: !!orderContractId,
  });

  useEffect(() => {
    if (!orderData?.expiration) return;

    let intervalId;

    try {
      setRemainingTime(countdownToTimestamp(orderData.expiration));

      intervalId = setInterval(() => {
        setRemainingTime(countdownToTimestamp(orderData.expiration));
      }, 1000 * 60);
    } catch (error) {
      if (error.message === countdownToTimestampErrorMessage) {
        expireEscrow(escrow.id)
          .then((data) => {
            if (data?.expiredStatus) {
              updateEscrow({ status: data.expiredStatus });
            }
          })
          .catch((error) => console.error(error));
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderData]);

  if (isPending) return null;
  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  return <p className={styles.timer}>Time remaining: {remainingTime}</p>;
}
