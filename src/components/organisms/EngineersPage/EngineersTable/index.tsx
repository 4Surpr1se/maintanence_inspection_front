import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import EngineersTableHead from "../EngineersTableHead";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { useAppSelector } from "@/store/redux-hooks";
import { IEngineers } from "@/store/slices/engineersSlice";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useSearchParams } from "react-router";

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
  },
];

export default function EngineersTable() {
  const engineers = useAppSelector((s) => s.engineers.data);
  const [searchParams] = useSearchParams();

  const data = engineers
    .filter((el) => {
      const engineerParam = searchParams.get("engineer");
      return (
        el.sn === "NAN" &&
        (engineerParam
          ? `${el.surname} ${el.name}`.toLowerCase().includes(engineerParam.toLowerCase())
          : true)
      );
    })
    .map((el) => {
      return { ...el, fio: `${el.surname} ${el.name}` };
    });

  return (
    <div
      onDragEnd={(e) => {
        e.preventDefault();
      }}
    >
      <List
        config={{
          columns,
          data,
          uniqKey: "id",
          header: <EngineersTableHead />,
        }}
      />
    </div>
  );
}
