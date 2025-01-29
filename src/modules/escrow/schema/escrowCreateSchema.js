import { object, string, mixed } from "yup";

import {
  escrowSelects,
  escrowCurrencies,
  escrowDealTypes,
} from "@/modules/escrow/constants";

import { enumsValidator } from "@/lib/helpers";
import { ethereumAddressRegex } from "@/lib/regex";
import { maxIntegersInEscrowContractAmount } from "@/modules/escrow/constants";

const maxDecimals = 3;
const maxIntegers = maxIntegersInEscrowContractAmount;

const paymentSchema = {
  amount: string()
    .required("This field is required")
    .test("is-valid-number", "Must be a valid number", (value) => {
      if (value === undefined || value === null) return true;
      return !isNaN(Number(value));
    })
    .test("greater-than-zero", "The value must be greater than 0", (value) => {
      if (!value) return true;
      const numberValue = Number(value);
      return numberValue > 0;
    })
    .test(
      "max-decimals",
      `No more than ${maxDecimals} digits in decimal part`,
      (value) => {
        if (!value) return true;
        const decimalPart = value.split(".")[1];
        return !decimalPart || decimalPart.length <= maxDecimals;
      }
    )
    .test(
      "max-integer",
      `No more than ${maxIntegers} digits in integer part`,
      (value) => {
        if (!value) return true;
        const integerPart = value.split(".")[0].replace("-", "");
        return integerPart.length <= maxIntegers;
      }
    )
    .label("Amount"),
  currency: enumsValidator(escrowCurrencies)
    .required("This field is required")
    .label("Currency"),
};

export const escrowCreateSchemaStepOneFunction = (userId) =>
  object().shape({
    name: string()
      .trim()
      .required("This field is required")
      .max(50)
      .label("Name"),
    counterpartyAddress: string()
      .required("This field is required")
      .test(
        "not-exact-string",
        "You can not create escrow with yourself",
        (value) => value.toLowerCase() !== userId.toLowerCase()
      )
      .matches(ethereumAddressRegex, "Invalid wallet address format")
      .label("Counterparty Adress"),
    want: enumsValidator(escrowSelects)
      .required("This field is required")
      .label("Want"),
    have: enumsValidator(escrowSelects)
      .required("This field is required")
      .label("Have"),
  });

// const validExtensions = ["txt", "jpg", "png", "pdf", "docx", "xlsx"];

const checkIsRequiredDealType_file_to = ([dealType], schema) => {
  return [escrowDealTypes.file_to_funds, escrowDealTypes.file_to_file].includes(
    dealType
  )
    ? schema.required()
    : schema.notRequired();
};

export const escrowCreateSchemaStepTwo = object().shape({
  description: string()
    .required("This field is required")
    .max(500)
    .label("Description"),
  dealType: enumsValidator(escrowDealTypes)
    .required("This field is required")
    .label("Deal type"),

  // counterpartyFileName: string()
  //   .when("dealType", ([dealType], schema) => {
  //     return [
  //       escrowDealTypes.funds_to_file,
  //       escrowDealTypes.file_to_file,
  //     ].includes(dealType)
  //       ? schema.required()
  //       : schema.notRequired();
  //   })
  //   .matches(
  //     /^[^<>:"/\\|?*\x00-\x1F]+$/,
  //     "Invalid filename: contains restricted characters"
  //   )
  //   .test("has-valid-extension", "Invalid file extension", (value) => {
  //     if (!value) return false;
  //     const extension = value.split(".").pop();
  //     if (!extension) return false;
  //     return validExtensions.includes(extension);
  //   })
  //   .max(255, "Filename too long")
  //   .label("Counterparty File Name"),
  file: mixed().when("dealType", checkIsRequiredDealType_file_to).label("File"),
  fileOriginalName: string()
    .when("dealType", checkIsRequiredDealType_file_to)
    .label("File Original Name"),
  fileContractId: string()
    .when("dealType", checkIsRequiredDealType_file_to)
    .label("File Contract ID"),
  fileMimeType: string()
    .when("dealType", checkIsRequiredDealType_file_to)
    .label("File mime Type"),
  fileSharedKey: string()
    .when("dealType", checkIsRequiredDealType_file_to)
    .label("File Shared Key"),

  requestedPayment: object()
    .when("dealType", ([dealType], schema) => {
      return [
        escrowDealTypes.file_to_funds,
        escrowDealTypes.funds_to_funds,
      ].includes(dealType)
        ? schema.required("This field is required").shape(paymentSchema)
        : schema.notRequired();
    })
    .label("Counterparty Payment"),

  providedPayment: object()
    .when("dealType", ([dealType], schema) => {
      return [
        escrowDealTypes.funds_to_file,
        escrowDealTypes.funds_to_funds,
      ].includes(dealType)
        ? schema.required("This field is required").shape(paymentSchema)
        : schema.notRequired();
    })
    .label("Provided Payment"),
});
