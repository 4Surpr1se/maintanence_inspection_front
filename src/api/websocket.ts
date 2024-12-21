import { setEngineers, setSelectEngineers } from "@/store/slices/engineersSlice";
import { AppDispatch } from "@/store/store";

export let socket: WebSocket | null = null;
let reconnectInterval: number | null;

export function setSocketDate(date?: string) {
  const url = `ws://158.160.35.172:8000/ws/date/${date}/`;
  socket = new WebSocket(url);
}

export function initializeWebSocket(dispatch: AppDispatch, date: string) {
  setSocketDate(date);

  socket!.onopen = () => {
    console.log("WebSocket connected");

    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }
  };

  socket!.onmessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);

    dispatch(setEngineers(message));
    dispatch(setSelectEngineers(message));
  };

  socket!.onerror = (error: Event) => {
    console.error("WebSocket error:", error);
  };

  socket!.onclose = () => {
    console.log("WebSocket disconnected");

    if (reconnectInterval) return;

    reconnectInterval = setInterval(() => {
      console.log("Attempting to reconnect...");
      initializeWebSocket(dispatch, date);
    }, 5000);
  };
}

export function sendWebSocketMessage(engineer: any) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
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

export function closeWebSocket() {
  if (socket) {
    socket.close();
    console.log("WebSocket closed");
  }
}
