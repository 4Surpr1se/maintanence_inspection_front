import { FC, memo, ReactNode } from "react";
import styled from "styled-components";

type HeaderCellProps = {
  children: ReactNode;
};

const Cell = styled.th`
  line-height: 24px;
  white-space: pre-line;
  &::before {
    content: "";
    height: 0px !important;
    width: 0px !important;
  }
`;

export const HeaderCell: FC<HeaderCellProps> = memo(({ children, ...props }) => {
  return <Cell {...props}>{children}</Cell>;
});
