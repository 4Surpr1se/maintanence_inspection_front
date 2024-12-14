import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { Flex } from "antd";
import { TableTitle } from "./styles";
import { useDrop } from "react-dnd";

interface DataType {
  trackingId: string;
  fio: string;
  hours: number;
}

const columns: Column<DataType>[] = [
  {
    key: "trackingId",
    title: "Tracking ID",
    dataIndex: "trackingId",
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
    dataIndex: "hours",
    render: (text) => <CustomSelect value={text} />,
    sorter: (a, b) => a.hours - b.hours,
  },
];

const data: DataType[] = [
  {
    trackingId: "#20462",
    fio: "Иван Иванов",
    hours: 1,
  },
  {
    trackingId: "#20122",
    fio: "Иван Смирнов",
    hours: 5,
  },
  {
    trackingId: "#204122",
    fio: "Иван Попов",
    hours: 9,
  },
];

export default function FlightsTable() {
  const [, dropRef] = useDrop({
    accept: "pilot",
    drop: (item) => {
      console.log(item);
    },
  });

  return (
    <Flex vertical ref={dropRef}>
      <List
        config={{
          columns,
          data,
          uniqKey: "trackingId",
          header: <TableTitle>RA-09607</TableTitle>,
        }}
      />
    </Flex>
  );
}
