import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, escrowEndpoint } from "@/lib/constants";

export default async function getActiveEscrows() {
  const response = await fetchWithToken(`${apiUrl}${escrowEndpoint}/active`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.escrows;
}
