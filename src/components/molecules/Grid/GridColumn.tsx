import { Row } from "antd";
import { ReactNode, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const GridColumnStyled = styled(Row)<{ $fixed?: boolean; $isSticky: boolean }>`
  border-bottom: ${({ $isSticky }) => (!$isSticky ? "1px rgba(103, 59, 230, 0.2) solid" : "none")};
  min-height: 54px;
  &:last-of-type {
    border-bottom: none;
  }
  ${({ $fixed }) =>
    $fixed &&
    css`
      position: sticky;
      top: -1px;
      z-index: 3;
    `}
  ${({ $isSticky }) =>
    $isSticky &&
    css`
      background-color: #fff;
    `}
`;

export const GridColumn = ({ children, fixed }: { children: ReactNode; fixed: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => (e.intersectionRatio < 1 ? setIsSticky(true) : setIsSticky(false)),
      { threshold: [1] },
    );

    ref.current && observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <GridColumnStyled gutter={[8, 8]} $fixed={fixed} ref={ref} $isSticky={isSticky}>
      {children}
    </GridColumnStyled>
  );
};
