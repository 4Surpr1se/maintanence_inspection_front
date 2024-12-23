import { Column } from "@/components/molecules/Grid";
import { IReportData } from "@/store/slices/ReportSlice/types";

export const reportDataColumns: Column<IReportData>[] = [
  {
    key: "trackingId",
    title: "Tracking ID",
    dataIndex: "id",
  },
  {
    key: "WP",
    title: "WP",
    dataIndex: "wp",
  },
  {
    key: "Task&Limitations",
    title: "Task & Limitations",
    dataIndex: "task_limitations",
  },
  {
    key: "Station",
    title: "Station",
    dataIndex: "Station_id",
  },
  {
    key: "Man-Hours",
    title: "Man-Hours",
    dataIndex: "mh",
  },
  {
    key: "DateStart",
    title: "Date Start",
    dataIndex: "date_start",
  },
  {
    key: "Date End",
    title: "Date End",
    dataIndex: "date_end",
  },
];
