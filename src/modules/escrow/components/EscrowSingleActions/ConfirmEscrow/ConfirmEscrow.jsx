import ConfirmWithFunds from "./ConfirmWithFunds";
import ConfirmWithFile from "./ConfirmWithFile";

import {
  escrowContractStatusesMap,
  escrowContractStatuses,
} from "@/modules/escrow/constants";

export default function ConfirmEscrow({
  confirmType,
  buttonTitle,
  orderData,
  orderContractId,
}) {
  const escrowContractStatus = escrowContractStatusesMap[orderData.status];

  const isApprovedContractStatus =
    escrowContractStatus === escrowContractStatuses.Approved;

  return (
    <>
      {!!orderContractId && (
        <>
          {confirmType === "funds" && (
            <ConfirmWithFunds
              buttonTitle={buttonTitle}
              orderContractId={orderContractId}
              isSkipContract={isApprovedContractStatus}
            />
          )}
          {confirmType === "file" && (
            <ConfirmWithFile
              buttonTitle={buttonTitle}
              orderContractId={orderContractId}
              isSkipContract={isApprovedContractStatus}
            />
          )}
        </>
      )}
    </>
  );
}
