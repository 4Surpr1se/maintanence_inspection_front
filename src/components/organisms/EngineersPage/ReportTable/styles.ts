import { Col } from "antd";
import styled from "styled-components";

export const MiniTable = styled.div`
  background-color: var(--white);
  padding: 16px;
  border-radius: 8px;
  max-width: 360px;
`;

export const MiniTableCol = styled(Col)`
  background-color: #f7f6fe;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  white-space: nowrap;
`;
