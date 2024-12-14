import { Col, ColProps, Row, Spin } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { memo, ReactNode, useMemo } from "react";
import { GridConfig } from "./types";
import { isNotNil } from "@/lib/isNotNil";
import { getPropertyByPath } from "@/lib/getPropertyByPath";
import { maybe } from "@/lib/mayBe";
import { isRenderCell } from "./lib/isRenderCell";
import { Breakpoint } from "antd/lib";
import { GridColumn } from "./GridColumn";
import { GridHead, GridRow } from "./styles";

export type GridProps<T> = {
  config: GridConfig<T>;
  loading?: boolean;
  className?: string;
  accordion?: boolean;
  header?: ReactNode;
};

const defaultColSpan = {
  lg: 24,
  md: 24,
  sm: 24,
  xl: 24,
  xs: 24,
  xxl: 24,
} satisfies { [K in Breakpoint]: Required<ColProps>["span"] };

const Grid = <T extends AnyObject>({
  config: { columns: propsColumns, data, uniqKey, gridGap = 16, colSpan: propsColSpan, onRow },
  loading,
  className,
  accordion,
  header,
}: GridProps<T>) => {
  const colSpan = useMemo(() => {
    return { ...defaultColSpan, ...propsColSpan };
  }, [propsColSpan]);

  const columns = useMemo(() => {
    return propsColumns.map(({ ...col }) => ({
      ...col,
      onHeaderCell: (
        data: Parameters<Required<typeof col>["onHeaderCell"]>[0],
        index: Parameters<Required<typeof col>["onHeaderCell"]>[1],
      ) => {
        const propsOnHeaderCell = {
          ...col.onHeaderCell?.(data, index),
        };
        return {
          ...propsOnHeaderCell,
          style: {
            display: "flex",
            alignItems: "center",
            color: "#7F7F7F",
            fontWeight: 500,
            fontSize: "16px",
            ...propsOnHeaderCell?.style,
          },
        };
      },
      onCell: (
        data: Parameters<Required<typeof col>["onCell"]>[0],
        index?: Parameters<Required<typeof col>["onCell"]>[1],
      ) => {
        const propsOnCell = {
          ...col.onCell?.(data, index),
        };
        return {
          ...propsOnCell,
          style: {
            display: "flex",
            alignItems: "center",
            color: "#444",
            fontWeight: 500,
            fontSize: "16px",
            ...propsOnCell.style,
          },
        };
      },
    }));
  }, [propsColumns]);

  const items = useMemo(() => {
    return data?.map((el, i) => (
      <>
        <Col key={"header"}>
          <GridHead>{header}</GridHead>
        </Col>
        <Col
          key={isNotNil(el[uniqKey]) ? el[uniqKey] : i}
          {...colSpan}
          draggable
          style={{ cursor: "grab" }}
        >
          <GridRow {...onRow?.(el, i)}>
            {columns.map((col, i) => {
              if (accordion) {
                console.log(col);

                return <p>a</p>;
              }

              const {
                dataIndex,
                key,
                render,
                title,
                emptyValue,
                onCell,
                onHeaderCell,
                span = {
                  contentSpan: 12,
                  titleSpan: 12,
                },
                fixed,
                gridTitletitle,
              } = col;
              const { contentSpan, titleSpan } = span;
              const data = isNotNil(dataIndex) ? getPropertyByPath(el, dataIndex) : undefined;
              const renderCell = render?.(data, el, i);
              return (
                <GridColumn key={key || dataIndex || i} fixed={!!fixed}>
                  <Col span={titleSpan} {...onHeaderCell(col as any, i)}>
                    {gridTitletitle
                      ? typeof gridTitletitle === "function"
                        ? gridTitletitle(el)
                        : gridTitletitle
                      : typeof title === "function"
                      ? title({})
                      : title}
                  </Col>
                  <Col span={contentSpan} {...onCell(el, i)}>
                    {render
                      ? isRenderCell(renderCell)
                        ? renderCell.children
                        : renderCell
                      : maybe(data, emptyValue)}
                  </Col>
                </GridColumn>
              );
            })}
          </GridRow>
        </Col>
      </>
    ));
  }, [data, uniqKey, colSpan, onRow, columns, accordion]);

  if (loading) {
    return <Spin />;
  }

  return (
    <Row gutter={[gridGap, gridGap]} className={className}>
      {items}
    </Row>
  );
};

export const MemoGrid = memo(Grid) as typeof Grid;
