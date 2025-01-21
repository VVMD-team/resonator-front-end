import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";

export default async function getBoxById(boxId) {
  const response = await fetchWithToken(`${apiUrl}${boxEndpoint}?id=${boxId}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
}
