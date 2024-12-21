import { useAppSelector } from "@/store/redux-hooks";
import { IEngineer } from "@/store/slices/engineersSlice";
import { memo, ReactNode } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

export type RowProps = {
  children: ReactNode;
  "data-row-key": number;
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
  const engineerItems = useAppSelector((s) => s.engineers.selectData);

  const item = engineerItems.find(
    (engineer: IEngineer) => engineer.id === { ...props }["data-row-key"],
  );

  const [{ isDragStart }, rowRef] = useDrag({
    type: "engineer",
    item: item,
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
