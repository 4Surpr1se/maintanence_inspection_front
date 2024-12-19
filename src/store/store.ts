import { configureStore } from "@reduxjs/toolkit";
import EngineersSlice from "./slices/engineersSlice";

export const store = configureStore({
  reducer: {
    engineers: EngineersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
