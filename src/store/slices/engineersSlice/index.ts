import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IEngineers {
  date: string;
  engineer_id: number;
  id: number;
  mh: number;
  name: string;
  sn: string;
  status: string;
  surname: string;
  types: string[];
}

export interface IAvailable {
  sn: string;
  type: string;
}

export const fetchEngineers = createAsyncThunk<
  { data: IEngineers[]; available: IAvailable[] },
  string
>("flight/fetchFlight", async (date) => {
  console.log("d", date);

  try {
    const { data } = await axios.get(`${BASE_URL + date}/`);

    return data;
  } catch (error) {
    console.log(`Failed to fetch: ${error}`);
  }
});

interface EngineersSliceState {
  data: IEngineers[];
  available: IAvailable[];
}

const initialState: EngineersSliceState = {
  data: [],
  available: [],
};

export const EngineersSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEngineers.fulfilled, (state, action) => {
      state.data = action.payload?.data;
      state.available = action.payload?.available;
    });
  },
});

export default EngineersSlice.reducer;
