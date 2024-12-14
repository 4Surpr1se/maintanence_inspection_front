import { useState } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib";
import { Wrapper } from "./styles";
import { ArrowIcon } from "./icons";

interface CustomSelectProps extends SelectProps {
  fullWidth?: boolean;
}

export const CustomSelect = (props: CustomSelectProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownVisibleChange = (open: boolean) => {
    setIsDropdownVisible(open);
  };

  return (
    <Wrapper $isDropdownVisible={isDropdownVisible} $fullWidth={props.fullWidth}>
      <Select
        {...props}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        dropdownRender={(menu) => <Wrapper>{menu}</Wrapper>}
        suffixIcon={<ArrowIcon />}
      />
    </Wrapper>
  );
};
