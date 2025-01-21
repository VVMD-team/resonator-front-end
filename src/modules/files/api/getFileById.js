import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, filesEndpoint } from "@/lib/constants";

export default async function getFileById(fileId) {
  const response = await fetchWithToken(
    `${apiUrl}${filesEndpoint}/file?id=${fileId}`,
    {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "any",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.file;
}
