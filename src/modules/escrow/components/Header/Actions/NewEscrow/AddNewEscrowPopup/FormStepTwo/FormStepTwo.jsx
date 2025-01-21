"use client";

import styles from "./FormStepTwo.module.css";

import { useState } from "react";

import Image from "next/image";
import { TbArrowLeft } from "react-icons/tb";

import { generateRandomUint256 } from "@/lib/util/cryption";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { escrowCreateSchemaStepTwo } from "@/modules/escrow/schema/escrowCreateSchema";

import UploadFileField from "./UploadFileField";
import RequestFile from "./RequestFile";

import { escrowDealTypes } from "@/modules/escrow/constants";

import FieldError from "@/ui/FieldError";
import PaymentFields from "./PaymentFields";
import Container from "./Container";
import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";
import HookFormTextarea from "@/ui/HookFormTextarea";
import Button from "@/ui/Button";
import EscrowPopup from "@/modules/escrow/ui/Popup";

export default function FormStepTwo({
  name,
  dealType,
  onBack,
  onClose,
  onSubmit,
  isSubmitDisabled: isSubmitDisabledProp,
}) {
  const [isGeneratingRandomUint256, setIsGeneratingRandomUint256] =
    useState(false);

  const isSubmitDisabled = isSubmitDisabledProp || isGeneratingRandomUint256;

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
    control,
  } = useForm({
    resolver: yupResolver(escrowCreateSchemaStepTwo),
  });

  const resetSelectErrors = () => {
    clearErrors("providedPayment.currency");
    clearErrors("requestedPayment.currency");
  };

  const onSubmitForm = async ({
    // counterpartyFileName,
    file,
    fileOriginalName,
    fileContractId,
    fileMimeType,
    fileSharedKey,

    providedPayment,
    requestedPayment,
    description,
  }) => {
    if (
      providedPayment?.currency &&
      requestedPayment?.currency &&
      providedPayment.currency === requestedPayment.currency
    ) {
      const currencyError = {
        type: "custom",
        message: "You can't use same currencies",
      };
      setError("providedPayment.currency", currencyError);
      setError("requestedPayment.currency", currencyError);

      return;
    }

    const data = { description };

    if (
      dealType === escrowDealTypes.file_to_funds ||
      dealType === escrowDealTypes.file_to_file
    ) {
      data.file = file;
      data.fileOriginalName = fileOriginalName;
      data.fileContractId = fileContractId;
      data.fileMimeType = fileMimeType;
      data.fileSharedKey = fileSharedKey;
    }

    if (
      dealType === escrowDealTypes.file_to_file ||
      dealType === escrowDealTypes.funds_to_file
    ) {
      // data.counterpartyFileName = counterpartyFileName;
      setIsGeneratingRandomUint256(true);
      data.counterpartyFileContractId = await generateRandomUint256();
    }

    if (dealType === escrowDealTypes.file_to_funds) {
      data.requestedPayment = requestedPayment;
    }

    if (dealType === escrowDealTypes.funds_to_funds) {
      data.providedPayment = providedPayment;
      data.requestedPayment = requestedPayment;
    }

    if (dealType === escrowDealTypes.funds_to_file) {
      data.providedPayment = providedPayment;
    }

    setIsGeneratingRandomUint256(false);
    onSubmit(data);
  };

  return (
    <EscrowPopup variant="full_screen" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
        <input
          type="hidden"
          value={dealType}
          {...register("dealType")}
          style={{ display: "none" }}
        />
        <div className={styles.form__header}>
          <span>
            <TbArrowLeft
              onClick={onBack}
              className={styles.form__header_icon}
            />
          </span>
          <h2 className={styles.form__header_title}>{name}</h2>
        </div>

        <div className={styles.form__content}>
          {(dealType === escrowDealTypes.file_to_funds ||
            dealType === escrowDealTypes.file_to_file) && (
            <Container title="File">
              <UploadFileField
                setFormError={setError}
                setFormValue={setValue}
                formErrors={errors}
              />
            </Container>
          )}
          {(dealType === escrowDealTypes.funds_to_funds ||
            dealType === escrowDealTypes.funds_to_file) && (
            <Container title="Payment">
              <PaymentFields
                register={register}
                control={control}
                fieldNameCurrency="providedPayment.currency"
                errorCurrencyMessage={errors.providedPayment?.currency?.message}
                fieldNameAmount="providedPayment.amount"
                errorAmountMessage={errors.providedPayment?.amount?.message}
                onChangeSelect={resetSelectErrors}
              />

              <p className={styles.tooltip}>
                Currently the Escrow Service commission is 0%. Enjoy it!
              </p>
            </Container>
          )}

          <Image
            src="/images/arrowright.svg"
            width={31}
            height={31}
            alt=""
            className={styles.form__content__icon}
          />

          {(dealType === escrowDealTypes.file_to_funds ||
            dealType === escrowDealTypes.funds_to_funds) && (
            <Container title="Payment">
              <PaymentFields
                register={register}
                control={control}
                fieldNameCurrency="requestedPayment.currency"
                errorCurrencyMessage={
                  errors.requestedPayment?.currency?.message
                }
                fieldNameAmount="requestedPayment.amount"
                errorAmountMessage={errors.requestedPayment?.amount?.message}
                onChangeSelect={resetSelectErrors}
              />
            </Container>
          )}

          {(dealType === escrowDealTypes.file_to_file ||
            dealType === escrowDealTypes.funds_to_file) && (
            <Container title="File">
              <RequestFile
              // register={register}
              // fieldName="counterpartyFileName"
              // errorMessage={errors.counterpartyFileName?.message}
              />
            </Container>
          )}
        </div>
        <div>
          <p>Description</p>

          <HookFormTextarea
            register={register}
            name="description"
            placeholder="Write a description or message to your counterparty."
            maxLength="500"
            isError={errors.description?.message}
            className={styles.textarea}
          />
          <FieldError message={errors.description?.message} />
        </div>

        <Button
          type="submit"
          className={styles.form___button}
          disabled={isSubmitDisabled}
        >
          {isSubmitDisabled ? (
            <LoaderSmall
              thickness={4}
              width={24}
              height={24}
              className={styles.form___button__loader}
            />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </EscrowPopup>
  );
}
