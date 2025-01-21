import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, createBoxEndpoint } from "@/lib/constants";

export default async function createBox(boxName) {
  const response = await fetchWithToken(`${apiUrl}${createBoxEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
    body: JSON.stringify({
      boxName,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
