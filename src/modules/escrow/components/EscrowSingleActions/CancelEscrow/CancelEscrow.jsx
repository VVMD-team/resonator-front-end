"use client";

import { useState, useCallback, useEffect } from "react";

import { cancelEscrow } from "@/modules/escrow/api";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";

import CancelOrder from "./CancelOrder";
import DeclineOrder from "./DeclineOrder";
import CancelEscrowConfirmPopup from "./CancelEscrowConfirmPopup";

import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

export default function CancelEscrow({
  buttonTitle,
  isCounterparty,
  orderContractId,
  escrowId,
}) {
  const { updateEscrow } = useEscrowSingle();

  const { startLoading, stopLoading } = useEscrowSingleLoadingPopup();

  const [openCallback, setOpenCallback] = useState(null);
  const [isSuccessContract, setIsSuccessContract] = useState(false);

  const handleOpen = (callback) => {
    setOpenCallback(callback);
  };

  const handleClose = () => {
    setOpenCallback(null);
  };

  const onSuccess = () => {
    setIsSuccessContract(true);
  };

  const onConfirm = useCallback(() => {
    startLoading("Cancelling deal");

    try {
      openCallback(orderContractId);
    } catch (error) {
      stopLoading();
      console.error(error);
    }

    setOpenCallback(null);
  }, [openCallback, orderContractId]);

  useEffect(() => {
    if (!isSuccessContract) return;

    const request = async () => {
      try {
        const data = await cancelEscrow(escrowId);

        const status = data?.status;

        if (!status) {
          alert("Something went wrong with cancelEscrow");
        }

        setOpenCallback(null);
        updateEscrow({ status });
      } catch (error) {
        console.error(error);
      }

      stopLoading();
    };

    request();
  }, [isSuccessContract]);

  return (
    <>
      {isCounterparty ? (
        <DeclineOrder
          onClick={handleOpen}
          onSuccess={onSuccess}
          buttonTitle={buttonTitle}
        />
      ) : (
        <CancelOrder
          onClick={handleOpen}
          onSuccess={onSuccess}
          buttonTitle={buttonTitle}
        />
      )}

      {openCallback && (
        <CancelEscrowConfirmPopup onConfirm={onConfirm} onClose={handleClose} />
      )}
    </>
  );
}
