import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, notificationsEndpoint } from "@/lib/constants";

export default async function viewNotification(notificationId) {
  const response = await fetchWithToken(
    `${apiUrl}${notificationsEndpoint}/view`,
    {
      method: "POST",
      body: JSON.stringify({ notificationId }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.result;
}
