import { List } from "@/components/molecules/List";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { Col, Flex, Row } from "antd";
import { ReportTableHead } from "./ReportTableHead";
import { useEffect } from "react";
import { fetchReport } from "@/store/slices/ReportSlice";
import dayjs from "dayjs";
import CustomButton from "@/components/atoms/CustomButton";
import { MiniTable, MiniTableCol } from "./styles";
import { reportDataColumns } from "./colums";

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
          columns: reportDataColumns,
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
        <MiniTable>
          <Row gutter={[8, 8]}>
            <MiniTableCol span={8}></MiniTableCol>
            <MiniTableCol span={8} style={{ fontWeight: 700 }}>
              MH
            </MiniTableCol>
            <MiniTableCol span={8} style={{ fontWeight: 700 }}>
              %
            </MiniTableCol>
            <MiniTableCol span={8}>Planned</MiniTableCol>
            <MiniTableCol span={8}>
              {Math.round(parseFloat(analysisData.planned.mh.toString()) * 100) / 100}
            </MiniTableCol>
            <MiniTableCol span={8}>{analysisData.planned.percent}</MiniTableCol>
            <MiniTableCol span={8}>Current</MiniTableCol>
            <MiniTableCol span={8}>{analysisData.current.mh}</MiniTableCol>
            <MiniTableCol span={8}>{analysisData.current.percent}</MiniTableCol>
            <Col>
              <CustomButton type="primary" size="small" style={{ width: "fit-content" }}>
                ↗ График
              </CustomButton>
            </Col>
          </Row>
        </MiniTable>
      )}
    </Flex>
  );
}
