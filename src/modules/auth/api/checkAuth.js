import fetchWithToken from "@/lib/util/fetchWithToken";

import { apiUrl } from "@/lib/constants";

export default async function checkAuth() {
  const response = await fetchWithToken(`${apiUrl}/check-auth`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.authenticated;
}
