import { CSSProperties, ReactNode } from "react";
import { CustomBtnStyle } from "./styles";

export type IButtonType = "primary" | "dark" | "primary-outline" | "light-purple" | "default";
export type IButtonHtmlType = "submit" | "reset" | "button";
export type IButtonSize = "small" | "medium" | "large";

interface ICustomButtonProps {
  children: ReactNode;
  type?: IButtonType;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  htmlType?: IButtonHtmlType;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: IButtonSize;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  id?: string;
}

const CustomButton = (props: ICustomButtonProps) => {
  const {
    type = "default",
    htmlType = "button",
    children,
    rightIcon,
    leftIcon,
    onClick,
    disabled,
    fullWidth = false,
    size = "large",
    className,
    style,
    loading,
    id,
  } = props;

  return (
    <CustomBtnStyle
      onClick={onClick}
      type={htmlType}
      disabled={disabled || loading}
      $type={type}
      $fullWidth={fullWidth}
      $size={size}
      className={className}
      style={style}
      id={id}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </CustomBtnStyle>
  );
};

export default CustomButton;
