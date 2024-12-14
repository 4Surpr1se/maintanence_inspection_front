import { BASE_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFlight = createAsyncThunk("flight/fetchFlight", async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/`);

    return data;
  } catch (error) {
    console.log(`Failed to fetch:`);
  }
});

const initialState = {};

export const flightSlice = createSlice({ name: "flight", initialState, reducers: {} });

export default flightSlice.reducer;
