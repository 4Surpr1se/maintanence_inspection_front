import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { Flex } from "antd";
import { ReportTableHead } from "./ReportTableHead";
import { IReportData } from "@/store/slices/ReportSlice/types";
import { useEffect } from "react";
import { fetchReport } from "@/store/slices/ReportSlice";
import dayjs from "dayjs";
import { MiniTable } from "./styles";
import CustomButton from "@/components/atoms/CustomButton";

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

  useEffect(() => {
    dispatch(fetchReport({ date: dayjs().format("YYYY-MM-DD"), sn: "RA-09601" }));
  }, []);

  if (reportDataLoading === "rejected") return;

  return (
    <Flex gap={20}>
      <List
        loading={reportDataLoading === "pending"}
        config={{
          columns,
          data: reportData,
          uniqKey: "id",
          header: <ReportTableHead />,
          footer: analysisData ? (
            <Flex>
              <p>
                <b>Man-Hours:</b> {reportData.reduce((acc, el) => acc + el.mh, 0)}{" "}
              </p>
            </Flex>
          ) : null,
        }}
      />
      {analysisData && (
        <MiniTable vertical gap={20}>
          <p>
            MH {analysisData.overall.mh} &nbsp; {analysisData.overall.percent} %
          </p>
          <p>
            Planned {Math.round(parseFloat(analysisData.planned.mh.toString()) * 100) / 100} &nbsp;{" "}
            {analysisData.planned.percent} %
          </p>
          <p>
            Current {analysisData.current.mh} &nbsp; {analysisData.current.percent} %
          </p>

          <CustomButton type="primary" size="small" style={{ width: "fit-content" }}>
            ↗ График
          </CustomButton>
        </MiniTable>
      )}
    </Flex>
  );
}
