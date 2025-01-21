import getAuthToken from "@/lib/util/getAuthToken";
import { wsUrl } from "@/lib/constants";

export const openWebsocketClient = () => {
  const token = getAuthToken();
  const ws = new WebSocket(`${wsUrl}?token=${token}`);

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return ws;
};
