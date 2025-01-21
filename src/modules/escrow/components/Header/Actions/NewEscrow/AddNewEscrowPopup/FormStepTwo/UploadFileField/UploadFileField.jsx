"use client";

import { useState } from "react";
import { useLoading } from "@/lib/hooks";

import {
  encryptFile,
  generateFakeCryptoSignatureWithApiRoute,
  generateRandomUint256,
} from "@/lib/util/cryption";

import UploadFileButton from "@/ui/UploadFileButton";
import FieldError from "@/ui/FieldError";
import LoaderSmall from "@/ui/LoaderSmall/LoaderSmall";

import { MAX_FILE_SIZE_MB } from "@/config/upload";
import { converBytesToMB } from "@/lib/helpers";

export default function UploadFileField({
  setFormError,
  setFormValue,
  formErrors,
}) {
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const [fileName, setFileName] = useState("");

  const handleChange = async (e) => {
    startLoading();
    const files = e.target.files;

    const file = files[0];

    const fileSizeMb = converBytesToMB(file.size);

    if (fileSizeMb >= MAX_FILE_SIZE_MB) {
      setFormError("file", {
        type: "custom",
        message: `Maximum file size is limited to ${MAX_FILE_SIZE_MB} MB.`,
      });
      stopLoading();
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

    setFormValue("file", encryptedBlob);
    setFormValue("fileOriginalName", file.name);
    setFormValue("fileMimeType", file.type);

    const fileContractId = await generateRandomUint256();
    setFormValue("fileContractId", fileContractId);
    setFormValue("fileSharedKey", signature);

    setFileName(file.name);
    stopLoading();
  };

  return isLoading ? (
    <LoaderSmall />
  ) : fileName ? (
    <p className="text-wrap">{fileName}</p>
  ) : (
    <>
      <UploadFileButton onChange={handleChange} />
      <FieldError message={formErrors.file?.message} />
    </>
  );
}
