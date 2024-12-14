import { InputProps } from "antd";
import { InputStyle } from "./styles";
import { SearchIcon } from "./icons";

export default function CustomInput(props: InputProps) {
  return <InputStyle {...props} placeholder="Поиск..." suffix={<SearchIcon />} />;
}
