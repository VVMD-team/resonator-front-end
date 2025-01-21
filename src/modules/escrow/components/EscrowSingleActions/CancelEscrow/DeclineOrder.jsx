import { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

import { useDeclineOrder } from "@/modules/escrow/contracts/escrow-swap/write";
import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

import Button from "@/ui/Button";

export default function DeclineOrder({
  onClick,
  onSuccess = () => {},
  buttonTitle,
}) {
  const { stopLoading } = useEscrowSingleLoadingPopup();

  const { data: declineOrderDataHash, error, declineOrder } = useDeclineOrder();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: declineOrderDataHash,
    });

  const handleClick = () => {
    onClick(() => (orderContractId) => {
      if (!orderContractId) {
        console.log("DeclineOrder", { orderContractId });
        throw new Error("No orderContractId");
      }

      declineOrder(orderContractId);
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
