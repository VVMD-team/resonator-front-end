"use client";

import styles from "./FormStepOne.module.css";

import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { escrowCreateSchemaStepOneFunction } from "@/modules/escrow/schema/escrowCreateSchema";
import { escrowSelects } from "@/modules/escrow/constants";

import { useUser } from "@/modules/user/context/UserContext";

import Select from "@/modules/escrow/ui/Select";
import EscrowPopup from "@/modules/escrow/ui/Popup";

import FieldError from "@/ui/FieldError";
import HookFormInput from "@/ui/HookFormInput";
import Button from "@/ui/Button";
import Checkbox from "@/ui/Checkbox";

import { formatEscrowDealTypeToWantHave } from "./helpers";

const options = [
  { value: escrowSelects.FILE, label: "File" },
  { value: escrowSelects.FUNDS, label: "Funds" },
];

export default function FormStepOne({
  onClose,
  onSubmit,
  defaultValues = null,
}) {
  const { user } = useUser();

  const userId = user.id;

  const escrowCreateSchemaStepOne = useMemo(
    () => escrowCreateSchemaStepOneFunction(userId),
    [userId]
  );

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues?.name || "",
      counterpartyAddress: defaultValues?.counterpartyAddress || "",
      want: formatEscrowDealTypeToWantHave(defaultValues?.dealType, "want"),
      have: formatEscrowDealTypeToWantHave(defaultValues?.dealType, "have"),
    },
    resolver: yupResolver(escrowCreateSchemaStepOne),
  });

  return (
    <EscrowPopup variant="medium" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form__title}>
          <p>New escrow</p>
        </div>
        <div className={styles.container}>
          <div className={styles.container__row}>
            <label className={styles.container__row__label}>Deal name</label>
            <div className={styles.container__row__field}>
              <HookFormInput
                register={register}
                name="name"
                type="text"
                placeholder="Enter name"
                maxLength="50"
                isError={errors.name?.message}
              />
              <FieldError message={errors.name?.message} />
            </div>
          </div>

          <div className={styles.container__row}>
            <label className={styles.container__row__label}>I have</label>
            <div className={styles.container__row__field}>
              <Controller
                name="have"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isError={errors.have?.message}
                    options={options}
                    type="secondary"
                    placeholder="File/funds"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
                  />
                )}
              />
              <FieldError message={errors.have?.message} />
            </div>
          </div>

          <div className={styles.container__row}>
            <label className={styles.container__row__label}>I want</label>
            <div className={styles.container__row__field}>
              <Controller
                name="want"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isError={errors.want?.message}
                    options={options}
                    type="secondary"
                    placeholder="File/funds"
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
                  />
                )}
              />
              <FieldError message={errors.want?.message} />
            </div>
          </div>

          <div className={styles.container__row}>
            <label className={styles.container__row__label}>Counterparty</label>
            <div className={styles.container__row__field}>
              <HookFormInput
                register={register}
                type="text"
                name="counterpartyAddress"
                placeholder="Enter address"
                isError={errors.counterpartyAddress?.message}
              />
              <FieldError message={errors.counterpartyAddress?.message} />
            </div>
          </div>

          <div className={styles.container__row}>
            <div className={styles.container__row__checkboxWrap}>
              <Checkbox
                disabled={true}
                checked={true}
                label="Private Deal"
                id="privateDealCheckbox"
              />
            </div>
          </div>

          <div className={styles.container__row}>
            <div className={styles.container__row__checkboxWrap}>
              <Checkbox
                disabled={true}
                checked={false}
                label="Manager Assistant"
                id="managerAssistantCheckbox"
              />
            </div>
          </div>
        </div>

        <Button type="submit" className={styles.form__button}>
          Next
        </Button>
      </form>
    </EscrowPopup>
  );
}
