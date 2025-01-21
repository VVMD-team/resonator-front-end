import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, escrowEndpoint } from "@/lib/constants";

export default async function finalizeEscrow(
  dataParam,
  settings = { isJSON: false }
) {
  const response = await fetchWithToken(`${apiUrl}${escrowEndpoint}/finalize`, {
    method: "POST",
    body: settings.isJSON ? JSON.stringify(dataParam) : dataParam,
    headers: {
      ...(settings.isJSON && { "Content-Type": "application/json" }),
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
