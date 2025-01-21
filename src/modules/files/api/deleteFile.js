import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function deleteFile(fileId) {
  const response = await fetchWithToken(`${apiUrl}${filesEndpoint}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any",
    },
    body: JSON.stringify({
      fileId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
