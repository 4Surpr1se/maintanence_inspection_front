import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { TableTitle, TableWrapper } from "./styles";
import { useDrop } from "react-dnd";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { setSelectEngineers } from "@/store/slices/engineersSlice";
import { useState } from "react";
import { sendWebSocketMessage } from "@/api/websocket";
import { IEngineer } from "@/store/slices/engineersSlice/types";

interface DataType extends IEngineer {
  fio: string;
}

interface AirplanesTableProps {
  sn: string;
  type: string;
}

export default function AirplanesTable(props: AirplanesTableProps) {
  const { sn, type } = props;
  const dispatch = useAppDispatch();
  const engineers = useAppSelector((s) => s.engineers.data);
  const engineersLoading = useAppSelector((s) => s.engineers.loading);

  const [hovered, setHovered] = useState<"orange" | "green" | null>(null);

  const columns: Column<DataType>[] = [
    {
      key: "trackingId",
      title: "Tracking ID",
      dataIndex: "engineer_id",
    },
    {
      key: "fio",
      title: "ФИО",
      dataIndex: "fio",
      render: (user) => <CardTableUser iconUrl="" userName={user} />,
    },
    {
      key: "hours",
      title: "Доступное количество часов",
      dataIndex: "mh",
      render: (text, record) => (
        <CustomSelect
          defaultValue={text}
          options={getWorkingHours(text)}
          onChange={(e) => dispatch(setSelectEngineers({ data: [{ ...record, mh: e }] }))}
        />
      ),
      sorter: (a, b) => a.mh - b.mh,
    },
  ];

  const data = engineers
    ? engineers
        .filter((el) => el.sn === sn && el.mh !== 0)
        .map((el) => {
          return { ...el, fio: `${el.surname} ${el.name}` };
        })
    : [];

  const [{ isOver }, dropRef] = useDrop({
    accept: "engineer",
    hover: (item) => {
      if (!item.types) return;
      if (item.types.includes(type)) {
        setHovered("green");
      } else {
        setHovered("orange");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item: IEngineer) => {
      const findEngineer = data.find((el) => el.engineer_id === item.engineer_id);

      const mhSelected = engineers.find((el) => el.id === item.id)!.mh - item.mh;
      const mhNew = findEngineer ? findEngineer.mh + item.mh : item.mh;

      if (findEngineer && item.id === findEngineer.id) return;

      const engineer = {
        data: [
          {
            date: item.date,
            mh: mhSelected,
            engineer_id: item.engineer_id,
            sn: item.sn,
          },
          { date: item.date, mh: mhNew, engineer_id: item.engineer_id, sn },
        ],
      };

      if (item) {
        sendWebSocketMessage(engineer);
      }
    },
  });

  return (
    <TableWrapper vertical ref={dropRef} $hovered={hovered} $isOver={isOver}>
      <List
        loading={engineersLoading === "pending"}
        config={{
          columns,
          data,
          uniqKey: "id",
          header: <TableTitle>{sn}</TableTitle>,
        }}
      />
    </TableWrapper>
  );
}
