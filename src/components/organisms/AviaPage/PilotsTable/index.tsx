import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import PilotsTableHead from "../PilotsTableHead";
import CardTableUser from "@/components/molecules/Card/CardTableUser";

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
    trackingId: "#223462",
    fio: "Иван Попов",
    hours: 9,
  },
];

export default function PilotsTable() {
  return (
    <div
      onDragEnd={(e) => {
        e.preventDefault();

        console.log("dragEnd");
      }}
    >
      <List
        config={{
          columns,
          data,
          uniqKey: "trackingId",
          header: <PilotsTableHead />,
        }}
      />
    </div>
  );
}
