import { configureStore } from "@reduxjs/toolkit";
import flightSlice from "./slices/flightSlice";

export const store = configureStore({
  reducer: {
    flight: flightSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
