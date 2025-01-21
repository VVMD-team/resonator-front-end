import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, escrowEndpoint } from "@/lib/constants";

export default async function getEscrowById(escrowId) {
  const response = await fetchWithToken(
    `${apiUrl}${escrowEndpoint}/single?id=${escrowId}`,
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.escrow;
}
