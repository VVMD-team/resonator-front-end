import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxFilesEndpoint } from "@/lib/constants";

export default async function getBoxFiles(boxId, isLong = false) {
  if (!boxId) {
    throw new Error("boxId is required");
  }

  const params = isLong ? `id=${boxId}&is_long=true` : `id=${boxId}`;

  const response = await fetchWithToken(
    `${apiUrl}${boxFilesEndpoint}/?${params}`,
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

  return data?.files;
}
