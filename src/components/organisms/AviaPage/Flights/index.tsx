import { Flex } from "antd";
import FlightsTable from "./FlightsTable";

export default function Flights() {
  return (
    <Flex vertical gap={10}>
      <FlightsTable />
      <FlightsTable />
      <FlightsTable />
    </Flex>
  );
}
