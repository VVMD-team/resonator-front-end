import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function shareOrTransferFile({
  action,
  walletPublicKey,
  fileId,
  recryptedBlob,
  sharedKey,
}) {
  const endpoint =
    action === "share" ? "/share" : action === "transfer" ? "/transfer" : "";

  if (!endpoint) {
    throw new Error("Unsupported action");
  }

  const formData = new FormData();

  formData.append("walletPublicKey", walletPublicKey);
  formData.append("fileId", fileId);
  if (recryptedBlob) {
    formData.append("file", recryptedBlob);
  }
  if (sharedKey) {
    formData.append("sharedKey", sharedKey);
  }

  const response = await fetchWithToken(
    `${apiUrl}${filesEndpoint}${endpoint}`,
    {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
