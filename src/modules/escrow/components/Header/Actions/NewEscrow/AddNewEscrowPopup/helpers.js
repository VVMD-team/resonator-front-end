export const formatFinalDataToFormData = (finalData, placeOrderDataHash) => {
  const formData = new FormData();
  formData.append("contractOrderHash", placeOrderDataHash);
  formData.append("name", finalData.name);
  formData.append("counterpartyAddress", finalData.counterpartyAddress);
  formData.append("dealType", finalData.dealType);
  formData.append("description", finalData.description);

  if (finalData.providedPayment) {
    formData.append(
      "providedPayment",
      JSON.stringify(finalData.providedPayment)
    );
  }
  if (finalData.requestedPayment) {
    formData.append(
      "requestedPayment",
      JSON.stringify(finalData.requestedPayment)
    );
  }
  if (
    finalData.file &&
    finalData.fileOriginalName &&
    finalData.fileContractId &&
    finalData.fileMimeType &&
    finalData.fileSharedKey
  ) {
    formData.append(`files[0][encryptedBlob]`, finalData.file);
    formData.append(`files[0][fileOriginalName]`, finalData.fileOriginalName);
    formData.append(`files[0][fileContractId]`, finalData.fileContractId);
    formData.append(`files[0][fileMimeType]`, finalData.fileMimeType);
    formData.append(`files[0][fileSharedKey]`, finalData.fileSharedKey);
  }
  if (finalData.counterpartyFileContractId) {
    formData.append(
      "counterpartyFileContractId",
      finalData.counterpartyFileContractId
    );
  }

  return formData;
};

export const formatDataToPlaceOrderData = (data) => ({
  dealType: data.dealType,
  counterpartyAddress: data.counterpartyAddress,
  providedPayment: data.providedPayment,
  requestedPayment: data.requestedPayment,
  fileContractId: data.fileContractId,
  counterpartyFileContractId: data.counterpartyFileContractId,
});

export const getCurrencyAmountFromData = (providedPayment) => {
  if (!providedPayment) return {};

  const currency = providedPayment.currency;
  const amount = providedPayment.amount;

  return { currency, amount };
};
