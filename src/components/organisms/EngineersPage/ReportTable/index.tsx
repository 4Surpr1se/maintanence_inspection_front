import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { Flex, Spin } from "antd";
import { ReportTableHead } from "./ReportTableHead";
import { IReportData } from "@/store/slices/ReportSlice/types";
import { useEffect } from "react";
import { fetchReport } from "@/store/slices/ReportSlice";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

const columns: Column<IReportData>[] = [
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

export default function ReportTable() {
  const dispatch = useAppDispatch();
  const reportData = useAppSelector((s) => s.report.data);
  const analysisData = useAppSelector((s) => s.report.analysis);
  const reportDataLoading = useAppSelector((s) => s.report.loading);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchReport({ date: dayjs().format("YYYY-MM-DD"), sn: "RA-09601" }));
  }, []);

  const filteredReportData = reportData.filter(
    (el) => el.task_limitations === searchParams.get("report"),
  );

  return (
    <List
      loading={reportDataLoading === "pending"}
      config={{
        columns,
        data: filteredReportData,
        uniqKey: "id",
        header: <ReportTableHead />,
        footer: analysisData ? (
          <Flex>
            Total <p>Man-Hours: {analysisData.current.mh} </p>
          </Flex>
        ) : null,
      }}
    />
  );
}
