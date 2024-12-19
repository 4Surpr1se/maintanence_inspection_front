import { Flex } from "antd";
import AirplanesTable from "./AirplanesTable";
import { useAppSelector } from "@/store/redux-hooks";

export default function Airplanes() {
  const availables = useAppSelector((s) => s.engineers.available);

  if (!availables) return;

  return (
    <Flex vertical gap={10}>
      {availables
        .filter((el) => el.sn !== "NAN")
        .map((el) => (
          <AirplanesTable {...el} />
        ))}
    </Flex>
  );
}
