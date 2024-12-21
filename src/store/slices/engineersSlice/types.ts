import { loadingType } from "@/store/store";

export interface EngineersSliceState {
  data: IEngineer[];
  available: IAvailable[];
  selectData: IEngineer[];
  loading: loadingType;
}

export const initialState: EngineersSliceState = {
  data: [],
  available: [],
  selectData: [],
  loading: "idle",
};

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
