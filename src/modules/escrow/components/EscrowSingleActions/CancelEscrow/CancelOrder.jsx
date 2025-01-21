import { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

import { useCancelOrder } from "@/modules/escrow/contracts/escrow-swap/write";
import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

import Button from "@/ui/Button";

export default function CancelOrder({
  onClick,
  onSuccess = () => {},
  buttonTitle,
}) {
  const { stopLoading } = useEscrowSingleLoadingPopup();

  const { data: cancelOrderDataHash, error, cancelOrder } = useCancelOrder();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: cancelOrderDataHash,
    });

  const handleClick = () => {
    onClick(() => (orderContractId) => {
      if (!orderContractId) {
        console.log("CancelOrder", { orderContractId });
        throw new Error("No orderContractId");
      }

      cancelOrder(orderContractId);
    });
  };

  useEffect(() => {
    if (isConfirming) {
      return;
    }

    if (isConfirmed) {
      onSuccess();
    }
  }, [isConfirming, isConfirmed, onSuccess]);

  useEffect(() => {
    if (error) {
      stopLoading();
    }
  }, [error]);

  return (
    <Button type="button" variant="tertinary" onClick={handleClick}>
      {buttonTitle}
    </Button>
  );
}
