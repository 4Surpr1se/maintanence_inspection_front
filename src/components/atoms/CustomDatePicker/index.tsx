import { DatePicker, DatePickerProps } from "antd";
import { CustomDatePickerStyle } from "./styles";

const CustomDatePicker = (props: DatePickerProps) => {
  return (
    <CustomDatePickerStyle>
      <DatePicker {...props} />
    </CustomDatePickerStyle>
  );
};

export default CustomDatePicker;
