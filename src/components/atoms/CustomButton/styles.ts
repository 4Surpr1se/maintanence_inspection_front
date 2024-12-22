import styled from "styled-components";
import { IButtonSize, IButtonType } from ".";

export const CustomBtnStyle = styled.button<{
  $type: IButtonType;
  $fullWidth: boolean;
  $size: IButtonSize;
}>`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: all 200ms ease-in-out;

  ${(p) => p.$fullWidth && "width: 100%;"}

  padding: ${(p) => (p.$size === "large" ? "0 40px" : p.$size === "medium" ? "0 16px" : "0 24px")};
  height: ${(p) => (p.$size === "large" ? "48px" : p.$size === "medium" ? "40px" : "30px")};

  border: 1px solid rgba(217, 217, 217, 1);

  background-color: ${(p) => (p.$type === "default" ? "var(--grey)" : "#624DE3")};
  color: ${(p) => (p.$type === "default" ? "var(--black)" : "var(--white)")};

  &:active {
    background-color: ${(p) => (p.$type === "default" ? "var(--white)" : "#624DD1")};
  }

  &:disabled {
    background-color: rgba(243, 243, 243, 1);
    border: 1px solid rgba(217, 217, 217, 1);
    color: rgba(217, 217, 217, 1);
    cursor: default;
  }
`;
