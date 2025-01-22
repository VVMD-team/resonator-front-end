"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import useLoading from "@/lib/hooks/useLoading";

import { useWaitForTransactionReceipt } from "wagmi";

import {
  escrowSelects,
  escrowDealTypes,
  fileToFileExtraFee,
} from "@/modules/escrow/constants";

import { createEscrow } from "@/modules/escrow/api";

import FormStepOne from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";

import { usePlaceOrder } from "@/modules/escrow/contracts/escrow-swap/write";
import { useApproveToken } from "@/modules/escrow/contracts/tokens/write";
import { formatFinalDataToFormData } from "./helpers";
import { confirmClose } from "../helpers";
import { escrowCurrencies } from "@/modules/escrow/constants";

const dataToPlaceOrderData = (data) => {
  return {
    dealType: data.dealType,
    counterpartyAddress: data.counterpartyAddress,
    providedPayment: data.providedPayment,
    requestedPayment: data.requestedPayment,
    fileContractId: data.fileContractId,
    counterpartyFileContractId: data.counterpartyFileContractId,
  };
};

export default function AddEscrowPopup({ onClose, onCreateEscrow }) {
  const {
    approveToken,
    isLoading: isLoadingApproveToken,
    isSuccess: isSuccessApproveToken,
    error: errorApproveToken,
  } = useApproveToken();

  const {
    data: placeOrderDataHash,
    isPending,
    error,
    placeOrder,
  } = usePlaceOrder();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: placeOrderDataHash,
    });

  const router = useRouter();

  const [stepOneData, setStepOneData] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const handleBack = () => {
    const isConfirmed = confirmClose();

    if (isConfirmed) {
      setStepOneData(null);
    }
  };

  // console.log("error contract: ", error);
  // console.log("placeOrderDataHash: ", placeOrderDataHash);

  const handleSubmitStepOne = async ({
    name,
    want,
    have,
    counterpartyAddress,
  }) => {
    const dealType = (() => {
      if (have === escrowSelects.FUNDS && want === escrowSelects.FUNDS) {
        return escrowDealTypes.funds_to_funds;
      }

      if (have === escrowSelects.FILE && want === escrowSelects.FUNDS) {
        return escrowDealTypes.file_to_funds;
      }

      if (have === escrowSelects.FUNDS && want === escrowSelects.FILE) {
        return escrowDealTypes.funds_to_file;
      }

      if (have === escrowSelects.FILE && want === escrowSelects.FILE) {
        return escrowDealTypes.file_to_file;
      }

      return "";
    })();

    if (!dealType) {
      throw new Error("Invalid  deal type");
    }

    setStepOneData({
      name,
      counterpartyAddress,
      dealType,
    });
  };

  const handleSubmitStepTwo = useCallback(
    (stepTwoData) => {
      startLoading();

      const data = { ...stepOneData, ...stepTwoData };

      const providedPayment = data?.providedPayment;
      const currency = providedPayment?.currency;
      const amount = providedPayment?.amount;

      const isEther = currency === escrowCurrencies.ETH;

      if (currency && amount && !isEther) {
        approveToken(currency, amount);
      } else {
        const placeOrderData = dataToPlaceOrderData(data);

        if (data.dealType === escrowDealTypes.file_to_file) {
          placeOrder(placeOrderData, { extraFee: fileToFileExtraFee });
        } else {
          placeOrder(placeOrderData);
        }
      }

      setFinalData(data);
    },
    [stepOneData]
  );

  useEffect(() => {
    if (isSuccessApproveToken && !isLoadingApproveToken) {
      const placeOrderData = dataToPlaceOrderData(finalData);

      placeOrder(placeOrderData);
    }
  }, [finalData, isSuccessApproveToken, isLoadingApproveToken]);

  useEffect(() => {
    if (isConfirming) {
      startLoading();
      return;
    }

    if (isConfirmed) {
      const formData = formatFinalDataToFormData(finalData, placeOrderDataHash);

      createEscrow(formData)
        .then((newEscrow) => {
          if (!newEscrow) {
            console.error("Error creating escrow", newEscrow);
            return;
          }

          onCreateEscrow({ id: newEscrow.id, name: newEscrow.name });

          router.push(`/escrow/${newEscrow.id}`);

          onClose(false);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(stopLoading);
    }
  }, [finalData, isConfirming, isConfirmed]);

  useEffect(() => {
    if (!error) return;

    stopLoading();
    alert(error.shortMessage || error.message);
  }, [error]);

  useEffect(() => {
    if (!errorApproveToken) return;

    stopLoading();
    alert(errorApproveToken.shortMessage || errorApproveToken.message);
  }, [errorApproveToken]);

  return !stepOneData ? (
    <FormStepOne onClose={onClose} onSubmit={handleSubmitStepOne} />
  ) : (
    <FormStepTwo
      name={stepOneData.name}
      dealType={stepOneData.dealType}
      onBack={handleBack}
      onClose={onClose}
      onSubmit={handleSubmitStepTwo}
      isSubmitDisabled={isLoading || isPending || isConfirming}
    />
  );
}
