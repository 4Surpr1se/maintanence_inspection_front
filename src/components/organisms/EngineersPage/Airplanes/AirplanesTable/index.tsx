import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { Flex } from "antd";
import { TableTitle } from "./styles";
import { useDrop } from "react-dnd";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { IEngineer } from "@/store/slices/engineersSlice";
import { useEffect } from "react";
import { initializeWebSocket, sendWebSocketMessage } from "@/api/websocket";

interface DataType extends IEngineer {
  fio: string;
}

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
        onChange={(e) => localStorage.setItem(record.engineer_id.toString(), e)}
      />
    ),
    sorter: (a, b) => a.mh - b.mh,
  },
];

interface AirplanesTableProps {
  sn: string;
  type: string;
}

export default function AirplanesTable(props: AirplanesTableProps) {
  const dispatch = useAppDispatch();

  const { sn } = props;

  const engineers = useAppSelector((s) => s.engineers.data);

  const data = engineers
    ? engineers
        .filter((el) => el.sn === sn)
        .map((el) => {
          return { ...el, fio: `${el.surname} ${el.name}` };
        })
    : [];

  useEffect(() => {
    initializeWebSocket(dispatch);
  }, []);

  const [, dropRef] = useDrop({
    accept: "engineer",
    drop: (item: IEngineer) => {
      const mh = engineers
        .filter((el) => el.engineer_id === item.id)
        .reduce((acc, el) => acc + el.mh, 0);
      const mhNew = mh + item.mh;

      const engineer = {
        data: [
          {
            date: item.date,
            mh: mh,
            engineer_id: item.engineer_id,
            sn: item.sn,
          },
          { date: item.date, mh: mhNew, engineer_id: item.engineer_id, sn },
        ],
      };

      if (item) {
        dispatch(sendWebSocketMessage(engineer));
      }
    },
  });

  return (
    <Flex vertical ref={dropRef}>
      <List
        config={{
          columns,
          data,
          uniqKey: "id",
          header: <TableTitle>{sn}</TableTitle>,
        }}
      />
    </Flex>
  );
}
