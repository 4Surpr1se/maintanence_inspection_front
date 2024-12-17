import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { Flex } from "antd";
import { TableTitle } from "./styles";
import { useDrop } from "react-dnd";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useAppSelector } from "@/store/redux-hooks";
import { IEngineers } from "@/store/slices/engineersSlice";

interface DataType extends IEngineers {
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
    render: (text) => <CustomSelect value={text} options={getWorkingHours()} />,
    sorter: (a, b) => a.mh - b.mh,
  },
];

interface AirplanesTableProps {
  sn: string;
  type: string;
}

export default function AirplanesTable(props: AirplanesTableProps) {
  const { sn, type } = props;

  const engineers = useAppSelector((s) => s.engineers.data);

  const data = engineers
    .filter((el) => el.sn === sn)
    .map((el) => {
      return { ...el, fio: `${el.surname} ${el.name}` };
    });

  const [, dropRef] = useDrop({
    accept: "engineer",
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
          uniqKey: "id",
          header: <TableTitle>{sn}</TableTitle>,
        }}
      />
    </Flex>
  );
}
