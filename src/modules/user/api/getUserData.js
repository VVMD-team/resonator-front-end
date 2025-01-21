import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, userDataEndpoint } from "@/lib/constants";

export default async function getUserData() {
  const response = await fetchWithToken(`${apiUrl}${userDataEndpoint}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
