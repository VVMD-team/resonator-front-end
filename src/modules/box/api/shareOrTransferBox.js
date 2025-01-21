import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";

export default async function shareOrTransferBox(
  action,
  walletPublicKey,
  boxId,
  rectyptedFiles = []
) {
  const shareOrTransferEndpoint =
    action === "share" ? "/share" : action === "transfer" ? "/transfer" : "";

  if (!shareOrTransferEndpoint) {
    throw new Error("Unsupported action");
  }

  const formData = new FormData();

  formData.append("walletPublicKey", walletPublicKey);
  formData.append("boxId", boxId);

  if (rectyptedFiles.length > 0) {
    for (let index = 0; index < rectyptedFiles.length; index++) {
      const { id, recryptedBlob, sharedKey } = rectyptedFiles[index];

      formData.append(`files[${index}][id]`, id);
      formData.append(`files[${index}][recryptedBlob]`, recryptedBlob);
      formData.append(`files[${index}][sharedKey]`, sharedKey);
    }
  }

  const response = await fetchWithToken(
    `${apiUrl}${boxEndpoint}${shareOrTransferEndpoint}`,
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

  return data?.result;
}
