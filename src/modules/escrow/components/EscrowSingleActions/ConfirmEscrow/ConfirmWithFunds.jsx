import { useEffect } from "react";

import { useWaitForTransactionReceipt } from "wagmi";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

import { useDepositCounterpartyFunds } from "@/modules/escrow/contracts/escrow-swap/write";

import { finalizeEscrow } from "@/modules/escrow/api";

import Button from "@/ui/Button";

export default function ConfirmWithFunds({
  orderContractId,
  isSkipContract,
  buttonTitle,
}) {
  const { escrow, updateEscrow } = useEscrowSingle();
  const { startLoading, stopLoading } = useEscrowSingleLoadingPopup();

  const {
    data: depositCounterpartyFundsDataHash,
    isPending,
    error,
    depositCounterpartyFunds,
  } = useDepositCounterpartyFunds();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositCounterpartyFundsDataHash,
    });

  const dealType = escrow.dealType;
  const escrowId = escrow.id;
  const requestedCounterpartyData = escrow.requestedCounterpartyData;
  const requestedAmount = requestedCounterpartyData?.payment?.amount;
  const requestedCurrency = requestedCounterpartyData?.payment?.currency;

  const handleConfirm = async () => {
    startLoading("Confirming deal");

    if (!isSkipContract) {
      depositCounterpartyFunds(orderContractId, {
        amount: requestedAmount,
        currency: requestedCurrency,
      });
    } else {
      finalizeEscrow({ escrowId, dealType, orderContractId }, { isJSON: true })
        .then((data) => {
          if (!data?.result) {
            alert("Something went wrong with finalizing escrow");
            return;
          }

          updateEscrow({ status: data?.status });
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        })
        .finally(() => {
          stopLoading();
        });
    }
  };

  useEffect(() => {
    if (isConfirming) {
      return;
    }

    if (isConfirmed) {
      finalizeEscrow({ escrowId, dealType, orderContractId }, { isJSON: true })
        .then((data) => {
          if (!data?.result) {
            alert("Something went wrong with finalizing escrow");
            return;
          }

          updateEscrow({ status: data?.status });
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        })
        .finally(() => {
          stopLoading();
        });
    }
  }, [isConfirming, isConfirmed]);

  useEffect(() => {
    if (error) {
      stopLoading();
    }
  }, [error]);

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleConfirm}
      disabled={isPending || isConfirming}
    >
      {buttonTitle}
    </Button>
  );
}
