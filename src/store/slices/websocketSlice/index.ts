// import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import { setEngineers } from "../engineersSlice";

// interface WebSocketState {
//   messages: any[];
//   connected: boolean;
//   error: string | null;
// }

// const initialState: WebSocketState = {
//   messages: [],
//   connected: false,
//   error: null,
// };

// let socket: WebSocket | null;

// export const initializeWebSocket = createAsyncThunk(
//   "websocket/initializeWebSocket",
//   async (_, { dispatch }) => {
//     socket = new WebSocket("ws://158.160.35.172:8000/ws/date/2024-03-12/");

//     return new Promise<WebSocket>((resolve, reject) => {
//       if (!socket) return;
//       socket.onopen = () => {
//         console.log("WebSocket connected");
//         resolve(socket as WebSocket);
//       };

//       socket.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         dispatch(setEngineers(message));
//       };

//       socket.onerror = (error) => {
//         console.error("WebSocket error:", error);
//         reject(error);
//       };
//     });
//   },
// );

// export const sendWebSocketMessage = createAsyncThunk<unknown, any>(
//   "websocket/sendWebSocketMessage",
//   (engineer) => {
//     if (!socket) return;
//     if (socket.readyState !== WebSocket.OPEN) {
//       throw new Error("WebSocket is not connected");
//     }
//     try {
//       socket.send(JSON.stringify(engineer));
//     } catch (error) {
//       throw new Error("WebSocket is not connected" + error);
//     }
//   },
// );

// export const websocketSlice = createSlice({
//   name: "websocket",
//   initialState,
//   reducers: {
//     disconnect: (state) => {
//       state.connected = false;
//     },
//     addMessage: (state, action: PayloadAction<any>) => {
//       state.messages.push(action.payload);
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(initializeWebSocket.pending, (state) => {
//         state.connected = false;
//         state.error = null;
//       })
//       .addCase(initializeWebSocket.fulfilled, (state, action) => {
//         state.connected = true;

//         action.payload.onclose = () => {
//           console.log("WebSocket disconnected");
//           state.connected = false;
//         };

//         action.payload.onerror = (error) => {
//           console.error("WebSocket error:", error);
//           state.error = "WebSocket error: " + error;
//         };
//       })
//       .addCase(initializeWebSocket.rejected, (state, action) => {
//         state.connected = false;
//         state.error = action.error.message || "Failed to connect to WebSocket";
//       });
//   },
// });

// export const { disconnect, addMessage, setError } = websocketSlice.actions;

// export default websocketSlice.reducer;
