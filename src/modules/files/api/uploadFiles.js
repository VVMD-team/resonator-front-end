import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl } from "@/lib/constants";

export default async function uploadFiles(formData) {
  const response = await fetchWithToken(`${apiUrl}/upload-files`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data?.files;
}
