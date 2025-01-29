import { escrowDealTypes } from "@/modules/escrow/constants";
import { escrowSelects } from "@/modules/escrow/constants";

export const formatEscrowDealTypeToWantHave = (dealType, fieldName) => {
  if (!dealType) return;

  if (dealType === escrowDealTypes.file_to_file) {
    return escrowSelects.FILE;
  }
  if (dealType === escrowDealTypes.funds_to_funds) {
    return escrowSelects.FUNDS;
  }

  const isFileFirst = dealType === escrowDealTypes.file_to_funds;

  const isFundsFirst = dealType === escrowDealTypes.funds_to_file;

  if (fieldName === "have") {
    if (isFileFirst) {
      return escrowSelects.FILE;
    }

    if (isFundsFirst) {
      return escrowSelects.FUNDS;
    }
  }

  if (fieldName === "want") {
    if (!isFileFirst) {
      return escrowSelects.FILE;
    }

    if (!isFundsFirst) {
      return escrowSelects.FUNDS;
    }
  }
};
