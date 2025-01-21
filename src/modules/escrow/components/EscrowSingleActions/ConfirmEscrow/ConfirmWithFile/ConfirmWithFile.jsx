import styles from "./ConfirmWithFile.module.css";

import { useEffect, useState } from "react";

import { useWaitForTransactionReceipt } from "wagmi";

import { finalizeEscrow } from "@/modules/escrow/api";

import { useEscrowSingle } from "@/modules/escrow/context/EscrowSingleContext";
import { useEscrowSingleLoadingPopup } from "@/modules/escrow/context/EscrowSingleLoadingPopupContext/EscrowSingleLoadingPopupContext";

import { useConfirmOrderWithoutFunds } from "@/modules/escrow/contracts/escrow-swap/write";

import {
  encryptFile,
  generateFakeCryptoSignatureWithApiRoute,
} from "@/lib/util/cryption";

import { MAX_FILE_SIZE_MB } from "@/config/upload";
import { converBytesToMB } from "@/lib/helpers";

import { formatFinalDataToFormData } from "./helpers";

export default function ConfirmWithFile({
  orderContractId,
  isSkipContract,
  buttonTitle,
}) {
  const [fileData, setFileData] = useState(null);

  const { escrow, updateEscrow } = useEscrowSingle();
  const { startLoading, stopLoading } = useEscrowSingleLoadingPopup();

  const {
    data: confirmOrderWithoutFundsDataHash,
    isPending,
    error,
    confirmOrderWithoutFunds,
  } = useConfirmOrderWithoutFunds();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: confirmOrderWithoutFundsDataHash,
    });

  const dealType = escrow.dealType;
  const escrowId = escrow.id;
  const requestedCounterpartyData = escrow.requestedCounterpartyData;
  const requestedFileContractId = requestedCounterpartyData?.fileContractId;

  const finalizeEscrowWithFinalData = async (finalData) => {
    const formData = formatFinalDataToFormData(finalData);

    finalizeEscrow(formData)
      .then((data) => {
        if (!data?.result) {
          alert("Something went wrong with finalizing escrow");
          return;
        }

        updateEscrow({
          status: data?.status,
          counterpartyData: {
            fileName: data?.counterpartyFileName,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      })
      .finally(() => stopLoading());
  };

  const handleConfirm = async (e) => {
    startLoading("Confirming deal");

    const file = e.target.files[0];

    if (!file) return;

    const fileSizeMb = converBytesToMB(file.size);

    if (fileSizeMb >= MAX_FILE_SIZE_MB) {
      alert(`Maximum file size is limited to ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    let signature;

    try {
      signature = await generateFakeCryptoSignatureWithApiRoute();
    } catch (error) {
      alert("Error generating signature");
      return;
    }

    const encryptedBlob = await encryptFile(file, signature);

    setFileData({
      file: encryptedBlob,
      fileOriginalName: file.name,
      fileMimeType: file.type,
      fileSharedKey: signature,
    });

    if (!isSkipContract) {
      confirmOrderWithoutFunds(orderContractId);
    } else {
      const finalData = {
        file: encryptedBlob,
        fileOriginalName: file.name,
        fileMimeType: file.type,
        fileSharedKey: signature,
        escrowId,
        dealType,
        orderContractId,
        fileContractId: requestedFileContractId,
      };

      finalizeEscrowWithFinalData(finalData);
    }
  };

  useEffect(() => {
    if (isConfirming) {
      return;
    }

    if (isConfirmed) {
      const finalData = {
        ...fileData,
        escrowId,
        dealType,
        orderContractId,
        fileContractId: requestedFileContractId,
      };

      finalizeEscrowWithFinalData(finalData);
    }
  }, [isConfirming, isConfirmed]);

  useEffect(() => {
    if (error) {
      stopLoading();
    }
  }, [error]);

  return (
    <label className={styles.button}>
      {buttonTitle}
      <input type="file" className={styles.input} onChange={handleConfirm} />
    </label>
  );
}
