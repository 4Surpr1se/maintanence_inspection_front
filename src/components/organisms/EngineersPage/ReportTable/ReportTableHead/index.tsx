import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import CustomInput from "@/components/atoms/CustomInput";
import { CustomSelect } from "@/components/atoms/CustomSelect";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { fetchReport } from "@/store/slices/ReportSlice";
import { Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

interface IOption {
  value: string | number;
  label: string | number;
}

export function ReportTableHead() {
  const dispatch = useAppDispatch();
  const availableData = useAppSelector((s) => s.engineers.available);
  const availableLoading = useAppSelector((s) => s.report.loading);

  const [availableOptions, setAvailableOptions] = useState<IOption[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedAvailable, setSelectedAvailable] = useState<string>("RA-09601");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const selectAvailableOptions = availableData
      .filter((el) => el.sn !== "NAN")
      .map((el) => ({ label: el.sn, value: el.sn }));

    setAvailableOptions(selectAvailableOptions);
  }, [availableData]);

  useEffect(() => {
    dispatch(fetchReport({ sn: selectedAvailable, date: selectedDate.format("YYYY-MM-HH") }));
  }, [selectedDate, selectedAvailable]);

  useEffect(() => {
    if (availableLoading === "rejected") toast.error("Произошла ошибка");
  }, [availableLoading]);

  function onInputChange(e: string) {
    setSearchParams((searchParams) => {
      if (e.length > 0) {
        searchParams.set("report", e);
      } else {
        searchParams.delete("report");
      }

      return searchParams;
    });
  }

  return (
    <Flex align="center" gap={24}>
      {availableOptions.length && (
        <>
          <p>Выберите ВС</p>
          <CustomSelect
            options={availableOptions}
            defaultValue={availableOptions[0].value}
            onChange={(e) => setSelectedAvailable(e)}
          />
        </>
      )}
      <p>Дата</p>
      <CustomDatePicker onCalendarChange={(e: any) => setSelectedDate(e)} value={selectedDate} />
      <CustomInput
        style={{ marginLeft: "auto" }}
        defaultValue={searchParams.get("report") ?? ""}
        onChange={(e) => onInputChange(e.target.value)}
      />
    </Flex>
  );
}
