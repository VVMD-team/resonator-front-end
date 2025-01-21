import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, escrowEndpoint } from "@/lib/constants";

export default async function expireEscrow(escrowId) {
  const response = await fetchWithToken(`${apiUrl}${escrowEndpoint}/expire`, {
    method: "POST",
    body: JSON.stringify({ escrowId }),
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
