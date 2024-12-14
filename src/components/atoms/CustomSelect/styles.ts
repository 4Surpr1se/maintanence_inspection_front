import styled from "styled-components";

export const Wrapper = styled.div<{ $isDropdownVisible?: boolean; $fullWidth?: boolean }>`
  .rc-virtual-list-scrollbar-thumb {
    width: 6px !important;
    height: 200px !important;
    background: var(--grey) !important;
  }

  .ant-select-item {
    padding: 10px 14px !important;
  }

  .ant-select-selector {
    border-radius: 12px !important;
    background: var(--grey) !important;
    padding: 12px 16px !important;
  }

  .ant-select-single {
    ${(p) => p.$fullWidth && "width: 100%;"}
    height: 30px !important;
    min-width: 80px;
  }

  .ant-select-arrow {
    transition: all 200ms linear;
    transform: ${(p) => (p.$isDropdownVisible ? "scale(-1)" : "scale(1)")};
  }

  .rc-virtual-list-scrollbar {
    right: -6px !important;
  }
`;
