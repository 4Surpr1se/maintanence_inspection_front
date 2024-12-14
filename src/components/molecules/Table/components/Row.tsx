import { memo, ReactNode } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

export type RowProps = {
  children: ReactNode;
};

const RowStyled = styled.tr<{ $isDragStart: boolean }>`
  height: 44px;
  cursor: grab;

  ${(p) => p.$isDragStart && "border-radius: none; "}

  &:last-of-type {
    td {
      border-color: transparent !important;
    }
  }
`;

export const Row = memo(({ children, ...props }: RowProps) => {
  const [{ isDragStart }, rowRef] = useDrag({
    type: "pilot",
    item: { id: 1, name: "hui" },
    collect: (monitor) => ({
      isDragStart: monitor.isDragging(),
    }),
  });

  return (
    <RowStyled {...props} ref={rowRef} $isDragStart={isDragStart}>
      {children}
    </RowStyled>
  );
});
