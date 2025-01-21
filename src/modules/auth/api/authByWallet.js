import { apiUrl } from "@/lib/constants";
import { authTokenStorageKey } from "@/lib/constants";

export default async function authByWallet(publicKey, signature, walletType) {
  const formData = new FormData();
  formData.append("walletPublicKey", publicKey);
  formData.append("signature", signature);
  formData.append("walletType", walletType);

  const response = await fetch(`${apiUrl}/auth/wallet`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  const token = data?.authorization;

  if (!token) {
    throw new Error("Token not recieveds");
  }

  if (token) {
    window.localStorage.setItem(authTokenStorageKey, token);
  }
}
