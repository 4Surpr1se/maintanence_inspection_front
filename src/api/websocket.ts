import { setEngineers } from "@/store/slices/engineersSlice";
import { AppDispatch } from "@/store/store";

const url = "ws://158.160.35.172:8000/ws/date/2024-03-12/";
const socket = new WebSocket(url);

export function initializeWebSocket(dispatch: AppDispatch) {
  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);

    dispatch(setEngineers(message));
  };

  socket.onerror = (error: Event) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };
}

export function sendWebSocketMessage(engineer: any) {
  if (socket.readyState !== WebSocket.OPEN) {
    console.error("WebSocket is not connected");
    return;
  }
  try {
    socket.send(JSON.stringify(engineer));
    console.log("Message sent:", engineer);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}
