import { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

import { useWithdrawDeclinedFunds } from "@/modules/escrow/contracts/escrow-swap/write";
import { finaliseWithdrawDeclinedFunds } from "@/modules/escrow/api";

import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";
import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";

import Button from "@/ui/Button";

export default function WithdrawDeclinedFunds({
  orderContractId,
  escrowId,
  buttonTitle,
}) {
  const { updateEscrow } = useEscrowSingle();
  const { startLoading, stopLoading } = useEscrowSingleLoadingPopup();

  const {
    data: withdrawDeclinedFundsDataHash,
    error,
    withdrawDeclinedFunds,
  } = useWithdrawDeclinedFunds();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: withdrawDeclinedFundsDataHash,
    });

  const handleWithdrawDeclinedFunds = () => {
    startLoading("Withdrawing declined funds");

    try {
      withdrawDeclinedFunds(orderContractId);
    } catch (error) {
      console.error(error);
      stopLoading();
    }
  };

  useEffect(() => {
    if (isConfirming) {
      return;
    }

    if (isConfirmed) {
      finaliseWithdrawDeclinedFunds(escrowId)
        .then((data) => {
          if (!data.result) {
            console.error("Error finalising withdraw declined funds");
            return;
          }

          updateEscrow({ isDeclinedFundsInContract: false });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          stopLoading();
        });
    }
  }, [isConfirming, isConfirmed, escrowId]);

  useEffect(() => {
    if (error) {
      stopLoading();
    }
  }, [error]);

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handleWithdrawDeclinedFunds}
    >
      {buttonTitle}
    </Button>
  );
}
