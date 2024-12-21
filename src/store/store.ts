import { configureStore } from "@reduxjs/toolkit";
import EngineersSlice from "./slices/engineersSlice";
import reportSlice from "./slices/ReportSlice";

export const store = configureStore({
  reducer: {
    engineers: EngineersSlice,
    report: reportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type loadingType = "idle" | "pending" | "fulfilled" | "rejected";
