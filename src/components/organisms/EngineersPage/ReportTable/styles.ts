import { Flex } from "antd";
import styled from "styled-components";

export const MiniTable = styled(Flex)`
  background-color: var(--white);
  padding: 16px;
  border-radius: 8px;

  p {
    background-color: #f7f6fe;
    padding: 16px;
    border-radius: 8px;
    display: inline-block;
    white-space: nowrap;
    height: fit-content;
  }
`;
