import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IEngineer {
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
  { data: IEngineer[]; available: IAvailable[] },
  string
>("flight/fetchFlight", async (date) => {
  try {
    const { data } = await axios.get(`${BASE_URL + date}/`);

    return data;
  } catch (error) {
    console.log(`Failed to fetch: ${error}`);
  }
});

interface EngineersSliceState {
  data: IEngineer[];
  available: IAvailable[];
}

const initialState: EngineersSliceState = {
  data: [],
  available: [],
};

export const EngineersSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setEngineers: (state, action) => {
      const newEngineers = action.payload.data;

      console.log("ne", newEngineers);

      const newData = state.data.filter(
        (engineer) =>
          !newEngineers.some(
            (newEng: IEngineer) =>
              newEng.engineer_id === engineer.engineer_id && newEng.sn === engineer.sn,
          ),
      );

      state.data = [...newData, ...newEngineers];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEngineers.fulfilled, (state, action) => {
      state.data = action.payload?.data;
      state.available = action.payload?.available;
    });
  },
});

export const { setEngineers } = EngineersSlice.actions;
export default EngineersSlice.reducer;
