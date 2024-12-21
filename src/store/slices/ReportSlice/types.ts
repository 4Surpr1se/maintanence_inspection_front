export interface IFetchReportParams {
  date: string;
  sn: string;
}

export interface IReportData {
  id: number;
  wp: string;
  aircraft_id: number;
  task_limitations: string;
  Station_id: number;
  mh: number;
  date_start: string;
  date_end: string;
}

export interface IAnalysis {
  planned: {
    mh: number;
    percent: number;
  };
  current: {
    mh: number;
    percent: number;
  };
  overall: {
    mh: number;
    percent: number;
  };
}

export interface IReportState {
  data: IReportData[];
  analysis: IAnalysis | null;
  loading: "idle" | "pending" | "fullfilled" | "rejected";
}
