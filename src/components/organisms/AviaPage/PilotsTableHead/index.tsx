import CustomButton from "@/components/atoms/CustomButton";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import CustomInput from "@/components/atoms/CustomInput";
import { Flex } from "antd";

export default function PilotsTableHead() {
  return (
    <Flex align="center" gap={24}>
      <p>Дата</p>
      <CustomDatePicker />
      <CustomButton size="small">Сегодня</CustomButton>
      <p>Инженер</p>
      <CustomInput />
    </Flex>
  );
}
