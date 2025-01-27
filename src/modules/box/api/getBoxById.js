import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";
import { boxTypes } from "@/modules/box/constants";

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

  let box = data.data;

  if (box.type === boxTypes.transfered) {
    box.name = "Transferred";
  } else if (box.type === boxTypes.files_for_sell) {
    box.name = "Files for sale";
  } else if (box.type === boxTypes.files_bought) {
    box.name = "Acquired Files";
  }

  return box;
}
