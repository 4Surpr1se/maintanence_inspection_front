import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAnalysis, IFetchReportParams, IReportData, IReportState } from "./types";

export const fetchReport = createAsyncThunk<
  { data: IReportData[]; analysis: IAnalysis },
  IFetchReportParams
>("Report/fetchReport", async ({ date, sn }) => {
  try {
    const { data } = await axios.get(`${BASE_URL}maintenance-report/${sn}/${date}/`);

    return data;
  } catch (error) {
    console.log(`Failed to fetch:`);
    throw error;
  }
});

const initialState: IReportState = {
  data: [],
  analysis: null,
  loading: "idle",
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.analysis = action.payload.analysis;
        state.loading = "fullfilled";
      })
      .addCase(fetchReport.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchReport.rejected, (state) => {
        console.log("Произошла ошибка");
        state.loading = "rejected";
      });
  },
});

export default reportSlice.reducer;
