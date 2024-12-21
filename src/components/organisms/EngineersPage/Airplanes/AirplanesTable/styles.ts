import { Flex } from "antd";
import styled from "styled-components";

export const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
`;

export const TableWrapper = styled(Flex)<{ $hovered: "green" | "orange" | null; $isOver: boolean }>`
  ${(p) =>
    p.$isOver &&
    `
    -webkit-box-shadow: 0px 0px 10px 1px
      ${p.$hovered === "green" ? "rgba(0, 255, 0, 1)" : "rgba(253, 200, 41, 1)"};
    -moz-box-shadow: 0px 0px 10px 10px ${
      p.$hovered === "green" ? "rgba(0, 255, 0, 1)" : "rgba(253, 200, 41, 1)"
    };
    box-shadow: 0px 0px 10px 1px ${
      p.$hovered === "green" ? "rgba(0, 255, 0, 1)" : "rgba(253, 200, 41, 1)"
    };
  `}
`;
