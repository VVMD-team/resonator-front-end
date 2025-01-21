export const formatFinalDataToFormData = (finalData) => {
  const formData = new FormData();

  formData.append("escrowId", finalData.escrowId);
  formData.append("dealType", finalData.dealType);
  formData.append("orderContractId", finalData.orderContractId);

  formData.append(`files[0][encryptedBlob]`, finalData.file);
  formData.append(`files[0][fileOriginalName]`, finalData.fileOriginalName);
  formData.append(`files[0][fileMimeType]`, finalData.fileMimeType);
  formData.append(`files[0][fileSharedKey]`, finalData.fileSharedKey);
  formData.append(`files[0][fileContractId]`, finalData.fileContractId);

  return formData;
};
