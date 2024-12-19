import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import EngineersTableHead from "../EngineersTableHead";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { IEngineer } from "@/store/slices/engineersSlice";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useSearchParams } from "react-router";
import { useDrop } from "react-dnd";
import { sendWebSocketMessage } from "@/api/websocket";

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
        onChange={(e) => localStorage.setItem(record.engineer_id.toString(), e)}
        options={getWorkingHours(text)}
      />
    ),
  },
];

export default function EngineersTable() {
  const engineers = useAppSelector((s) => s.engineers.data);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const data: DataType[] = engineers
    ? engineers
        .map((el) => {
          return {
            ...el,
            fio: `${el.surname} ${el.name}`,
          };
        })
        .filter((el) => {
          const engineerParam = searchParams.get("engineer");
          return (
            el.sn === "NAN" &&
            (engineerParam
              ? `${el.surname} ${el.name}`.toLowerCase().includes(engineerParam.toLowerCase())
              : true)
          );
        })
    : [];

  const [, dropRef] = useDrop({
    accept: "engineer",
    drop: (item: IEngineer) => {
      const sendEngineerMh =
        engineers.find((el) => el.engineer_id === item.engineer_id && el.sn === item.sn)!.mh -
        item.mh;
      const engineerMh =
        engineers.find((el) => el.engineer_id === item.engineer_id && el.sn === "NAN")!.mh +
        item.mh;

      const engineer = {
        data: [
          {
            date: item.date,
            mh: sendEngineerMh,
            engineer_id: item.engineer_id,
            sn: item.sn,
          },
          {
            date: item.date,
            mh: engineerMh,
            engineer_id: item.engineer_id,
            sn: "NAN",
          },
        ],
      };

      console.log(item);
      console.log(engineer);

      if (item) {
        dispatch(sendWebSocketMessage(engineer));
      }
    },
  });

  return (
    <div ref={dropRef}>
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
