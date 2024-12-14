import PilotsTable from "@/components/organisms/AviaPage/PilotsTable";
import { Container } from "@/styles/global";
import { AviaPageStyle } from "./styles";
import { Flex } from "antd";
import Flights from "@/components/organisms/AviaPage/Flights";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchFlight } from "@/store/slices/flightSlice";

export default function AviaPage() {
  const dispath = useAppDispatch();

  useEffect(() => {
    dispath(fetchFlight());
  }, []);

  return (
    <AviaPageStyle>
      <Container>
        <Flex gap={20} justify="space-between">
          <Flights />
          <PilotsTable />
        </Flex>
      </Container>
    </AviaPageStyle>
  );
}
