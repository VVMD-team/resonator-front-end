import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";

export default async function getAllBoxes() {
  try {
    const response = await fetchWithToken(
      `${apiUrl}${boxEndpoint}/get-all-boxes`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      }
    );
    const data = await response.json();
    return { boxes: data?.data, total: data?.total };
  } catch (error) {
    console.error(error);
    return [];
  }
}
