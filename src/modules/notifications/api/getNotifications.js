import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, notificationsEndpoint } from "@/lib/constants";

export default async function getNotifications() {
  const response = await fetchWithToken(`${apiUrl}${notificationsEndpoint}`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "any",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.notifications;
}
