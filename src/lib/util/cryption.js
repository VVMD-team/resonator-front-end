import generateFileSignatureMessage from "@/lib/util/generateFileSignatureMessage";

import { apiUrl } from "@/lib/constants";
import fetchWithToken from "./fetchWithToken";
export async function encryptFile(file, signature) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);

  const response = await fetchWithToken(`${apiUrl}/encrypt-file`, {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function decryptFile(fileId, signature, mimetype) {
  const formData = new FormData();
  formData.append("fileId", fileId);
  formData.append("signature", signature);
  formData.append("mimetype", mimetype);

  const response = await fetchWithToken(`${apiUrl}/decrypt-file`, {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();

  return blob;
}

export async function generateFakeCryptoSignatureWithApiRoute() {
  const response = await fetch("/api/fake-signature", {
    method: "GET",
  });

  const data = await response.json();

  return data?.signature;
}

export async function generateRandomUint256() {
  const response = await fetch("/api/random-uint-256", {
    method: "GET",
  });

  const data = await response.json();

  return data.uint256;
}

// export async function generateRandomCID() {
//   const response = await fetch("/api/random-cid", {
//     method: "GET",
//   });

//   const data = await response.json();

//   return data.cid;
// }

export async function generateCryptionSignature(publicKey, signMessageAsync) {
  const message = generateFileSignatureMessage(publicKey);

  const signature = await signMessageAsync({
    message,
    account: publicKey,
  });

  return signature;
}

export async function recryptFile(fileId, signature, mimetype, fileName) {
  const decryptedBlob = await decryptFile(fileId, signature, mimetype);

  const decryptedFile = new File([decryptedBlob], fileName, {
    type: mimetype,
  });

  const sharedKey = await generateFakeCryptoSignatureWithApiRoute();

  const recryptedBlob = await encryptFile(decryptedFile, sharedKey);

  return { recryptedBlob, sharedKey };
}
