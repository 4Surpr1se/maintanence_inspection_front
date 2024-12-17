import EngineersTable from "@/components/organisms/EngineersPage/EngineersTable";
import { Container } from "@/styles/global";
import { EngineersPageStyle } from "./styles";
import { Flex } from "antd";
import Airplanes from "@/components/organisms/EngineersPage/Airplanes";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchEngineers } from "@/store/slices/engineersSlice";
import dayjs from "dayjs";

export default function EngineersPage() {
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(fetchEngineers(dayjs().format("YYYY-MM-DD")));
  }, []);

  return (
    <EngineersPageStyle>
      <Container>
        <Flex gap={20} justify="space-between">
          <Airplanes />
          <EngineersTable />
        </Flex>
      </Container>
    </EngineersPageStyle>
  );
}
