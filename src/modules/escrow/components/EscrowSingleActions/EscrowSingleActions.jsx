import styles from "./EscrowSingleActions.module.css";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { useUser } from "@/modules/user/context/UserContext";

import Button from "@/ui/Button";
import CancelEscrow from "./CancelEscrow";
import ConfirmEscrow from "./ConfirmEscrow";
import WithdrawDeclinedFunds from "./WithdrawDeclinedFunds";

import {
  useOrderData,
  useOrderId,
} from "@/modules/escrow/contracts/escrow-swap/read";

import { escrowStatuses, escrowDealTypes } from "@/modules/escrow/constants";

const buttonTitles = {
  cancel: "Cancel deal",
  confirmFunds: "Withdraw",
  confirmFile: "Upload",
  withdrawDeclinedFunds: "Withdraw Funds",
  dispute: "Dispute",
};

export default function EscrowSingleActions() {
  const { user } = useUser();

  const { escrow } = useEscrowSingle();

  const userIdInLowerCase = user.id.toLowerCase();
  const isOwner = userIdInLowerCase === escrow.ownerId.toLowerCase();
  const isCounterparty =
    userIdInLowerCase === escrow.counterpartyAddress.toLowerCase();
  const escrowId = escrow.id;

  const [confirmType, confirmButtonTitle] = (() => {
    if (
      escrow.dealType === escrowDealTypes.funds_to_funds ||
      escrow.dealType === escrowDealTypes.file_to_funds
    ) {
      return ["funds", buttonTitles.confirmFunds];
    }

    if (
      escrow.dealType === escrowDealTypes.file_to_file ||
      escrow.dealType === escrowDealTypes.funds_to_file
    ) {
      return ["file", buttonTitles.confirmFile];
    }
  })();

  const isShowConfirm =
    escrow.status === escrowStatuses.in_progress && isCounterparty;
  const isShowCancel =
    escrow.status !== escrowStatuses.completed &&
    escrow.status !== escrowStatuses.canceled_by_owner &&
    escrow.status !== escrowStatuses.canceled_by_counterparty;
  const isShowWithdrawDeclinedFunds =
    isOwner && escrow.isDeclinedFundsInContract;

  const orderContractId = useOrderId(escrow.contractOrderHash);

  const { orderData, isPending, error } = useOrderData(orderContractId, {
    enabled: !!orderContractId,
  });

  if (isPending) return null;
  if (error) return <div>Error: {error.shortMessage || error.message}</div>;

  return (
    <div className={styles.container}>
      {isShowConfirm && (
        <ConfirmEscrow
          confirmType={confirmType}
          buttonTitle={confirmButtonTitle}
          orderData={orderData}
          orderContractId={orderContractId}
        />
      )}

      {isShowCancel && (
        <CancelEscrow
          isCounterparty={isCounterparty}
          orderContractId={orderContractId}
          escrowId={escrowId}
          buttonTitle={buttonTitles.cancel}
        />
      )}

      {isShowWithdrawDeclinedFunds && (
        <WithdrawDeclinedFunds
          orderContractId={orderContractId}
          escrowId={escrowId}
          buttonTitle={buttonTitles.withdrawDeclinedFunds}
        />
      )}

      <Button variant="quarter" disabled>
        {buttonTitles.dispute}
      </Button>
    </div>
  );
}
