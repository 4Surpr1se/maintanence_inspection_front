import EngineersTable from "@/components/organisms/EngineersPage/EngineersTable";
import { Container } from "@/styles/global";
import { EngineersPageStyle } from "./styles";
import { Flex } from "antd";
import Airplanes from "@/components/organisms/EngineersPage/Airplanes";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchEngineers } from "@/store/slices/engineersSlice";
import dayjs from "dayjs";
import { initializeWebSocket } from "@/api/websocket";
import ReportTable from "@/components/organisms/EngineersPage/ReportTable";

export default function EngineersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeWebSocket(dispatch, dayjs().format("YYYY-MM-DD"));
    dispatch(fetchEngineers(dayjs().format("YYYY-MM-DD")));
  }, [dispatch]);

  return (
    <EngineersPageStyle>
      <Container>
        <Flex gap={20} justify="space-between" style={{ marginBottom: 20 }}>
          <Airplanes />
          <EngineersTable />
        </Flex>
        <ReportTable />
      </Container>
    </EngineersPageStyle>
  );
}
