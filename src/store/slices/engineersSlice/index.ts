import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IEngineer, IAvailable, initialState } from "./types";

export const fetchEngineers = createAsyncThunk<
  { data: IEngineer[]; available: IAvailable[] },
  string
>("engineers/fetchEngineers", async (date, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${BASE_URL + "date/" + date}/`);

    return data;
  } catch (error) {
    console.log(`Failed to fetch: ${error}`);
    return rejectWithValue(error);
  }
});

export const EngineersSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setEngineers: (state, action) => {
      const newEngineers = action.payload.data;

      const newData = state.data.filter(
        (engineer) => !newEngineers.some((newEng: IEngineer) => newEng.id === engineer.id),
      );

      state.data = [...newData, ...newEngineers];
    },
    setSelectEngineers: (state, action) => {
      const newEngineers = action.payload.data;

      const newData = state.selectData.filter(
        (engineer) => !newEngineers.some((newEng: IEngineer) => newEng.id === engineer.id),
      );

      state.selectData = [...newData, ...newEngineers];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineers.fulfilled, (state, action) => {
        state.data = action.payload?.data;
        state.selectData = action.payload?.data;
        state.available = action.payload?.available;
        state.loading = "fulfilled";
      })
      .addCase(fetchEngineers.rejected, (state, action) => {
        console.error("Fetch engineers failed:", action.payload);
        state.loading = "rejected";
      })
      .addCase(fetchEngineers.pending, (state) => {
        state.loading = "pending";
      });
  },
});

export const { setEngineers, setSelectEngineers } = EngineersSlice.actions;
export default EngineersSlice.reducer;
