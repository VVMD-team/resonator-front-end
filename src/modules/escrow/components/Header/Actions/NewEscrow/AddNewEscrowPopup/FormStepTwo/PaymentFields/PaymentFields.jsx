import styles from "./PaymentFields.module.css";

import { Controller } from "react-hook-form";

import Select from "@/modules/escrow/ui/Select/Select";

import FieldError from "@/ui/FieldError";
import HookFormInput from "@/ui/HookFormInput";

import { escrowCurrenciesOptions } from "@/modules/escrow/contracts/escrow-swap/constants";

export default function PaymentFields({
  register,
  control,
  fieldNameCurrency,
  fieldNameAmount,
  errorCurrencyMessage,
  errorAmountMessage,
  onChangeSelect = () => {},
}) {
  return (
    <div className={styles.container}>
      <div className={styles.container__row}>
        <p className={styles.container__row__title}>Currency</p>

        <div>
          <Controller
            name={fieldNameCurrency}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isError={errorCurrencyMessage}
                options={escrowCurrenciesOptions}
                type="secondary"
                placeholder="Select Currency"
                onChange={(selectedOption) => {
                  field.onChange(selectedOption.value);
                  onChangeSelect();
                }}
              />
            )}
          />

          <FieldError message={errorCurrencyMessage} />
        </div>
      </div>
      <div className={styles.container__row}>
        <p className={styles.container__row__title}>Amount</p>

        <div>
          <HookFormInput
            register={register}
            name={fieldNameAmount}
            placeholder="Enter Amount"
            isError={errorAmountMessage}
            type="text"
          />

          <FieldError message={errorAmountMessage} />
        </div>
      </div>
    </div>
  );
}
