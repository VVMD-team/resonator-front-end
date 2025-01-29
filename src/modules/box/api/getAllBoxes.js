import fetchWithToken from "@/lib/util/fetchWithToken";
import { apiUrl, boxEndpoint } from "@/lib/constants";
import { boxTypes } from "@/modules/box/constants";

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

    const boxes = data.data.map((box) => {
      const boxName = box.name;

      if (box.type === boxTypes.transfered) {
        boxName = "Transferred";
      } else if (box.type === boxTypes.files_for_sell) {
        boxName = "Files for sale";
      } else if (box.type === boxTypes.files_bought) {
        boxName = "Acquired Files";
      }

      return {
        ...box,
        name: boxName
      }
    })
    return { boxes, total: data?.total };
  } catch (error) {
    console.error(error);
    return [];
  }
}
