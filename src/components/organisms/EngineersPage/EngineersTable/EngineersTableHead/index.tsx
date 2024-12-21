import { initializeWebSocket, socket } from "@/api/websocket";
import CustomButton from "@/components/atoms/CustomButton";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import CustomInput from "@/components/atoms/CustomInput";
import { useAppDispatch } from "@/store/redux-hooks";
import { fetchEngineers } from "@/store/slices/engineersSlice";
import { Flex } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function EngineersTableHead() {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [searchParams, setSearchParams] = useSearchParams();

  function onDateChange(date: any) {
    setSelectedDate(date);
    dispatch(fetchEngineers(dayjs(date).format("YYYY-MM-DD")));
    socket?.close();
    initializeWebSocket(dispatch, selectedDate.format("YYYY-MM-DD"));
  }

  function onInputChange(e: string) {
    setSearchParams((searchParams) => {
      if (e.length > 0) {
        searchParams.set("engineer", e);
      } else {
        searchParams.delete("engineer");
      }

      return searchParams;
    });
  }

  return (
    <Flex align="center" gap={24}>
      <p>Дата</p>
      <CustomDatePicker onCalendarChange={onDateChange} value={selectedDate} />
      <CustomButton
        size="small"
        onClick={() => {
          if (dayjs().format("YYYY-MM-HH") === selectedDate.format("YYYY-MM-HH")) return;
          onDateChange(dayjs());
        }}
      >
        Сегодня
      </CustomButton>
      <p>Инженер</p>
      <CustomInput
        defaultValue={searchParams.get("engineer") ?? ""}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </Flex>
  );
}
