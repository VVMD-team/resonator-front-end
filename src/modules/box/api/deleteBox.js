import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";

export default async function deleteBox(boxId) {
  const response = await fetchWithToken(`${apiUrl}${boxEndpoint}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
    body: JSON.stringify({ boxId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data?.result;
}
