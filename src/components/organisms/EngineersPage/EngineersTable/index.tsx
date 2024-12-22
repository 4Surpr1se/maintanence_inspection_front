import { CustomSelect } from "@/components/atoms/CustomSelect";
import { List } from "@/components/molecules/List";
import { Column } from "@/components/molecules/Table";
import EngineersTableHead from "./EngineersTableHead";
import CardTableUser from "@/components/molecules/Card/CardTableUser";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { setSelectEngineers } from "@/store/slices/engineersSlice";
import { getWorkingHours } from "@/lib/getWorkingHours";
import { useSearchParams } from "react-router";
import { useDrop } from "react-dnd";
import { sendWebSocketMessage } from "@/api/websocket";
import { IEngineer } from "@/store/slices/engineersSlice/types";

interface DataType extends IEngineer {
  fio: string;
}

export default function EngineersTable() {
  const engineers = useAppSelector((s) => s.engineers.data);
  const engineersLoading = useAppSelector((s) => s.engineers.loading);

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

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
          onChange={(e) => dispatch(setSelectEngineers({ data: [{ ...record, mh: e }] }))}
          options={getWorkingHours(text)}
        />
      ),
    },
  ];

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
            el.mh !== 0 &&
            (engineerParam
              ? `${el.surname} ${el.name}`.toLowerCase().includes(engineerParam.toLowerCase())
              : true)
          );
        })
    : [];

  const [, dropRef] = useDrop({
    accept: "engineer",
    drop: (item: IEngineer) => {
      const findEngineer = data.find((el) => el.engineer_id === item.engineer_id);

      const mhSelected = engineers.find((el) => el.id === item.id)!.mh - item.mh;
      const engineerMh = findEngineer ? findEngineer.mh + item.mh : item.mh;

      if (findEngineer && item.id === findEngineer.id) return;

      const engineer = {
        data: [
          {
            date: item.date,
            mh: mhSelected,
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

      if (item) {
        sendWebSocketMessage(engineer);
      }
    },
  });

  return (
    <div ref={dropRef}>
      <List
        loading={engineersLoading === "pending"}
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
