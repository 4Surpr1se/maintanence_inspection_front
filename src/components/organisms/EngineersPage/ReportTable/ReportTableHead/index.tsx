import CustomButton from "@/components/atoms/CustomButton";
import CustomDatePicker from "@/components/atoms/CustomDatePicker";
import { CustomSelect } from "@/components/atoms/CustomSelect";
import { useAppDispatch, useAppSelector } from "@/store/redux-hooks";
import { fetchReport } from "@/store/slices/ReportSlice";
import { Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const selectAvailableOptions = availableData
      .filter((el) => el.sn !== "NAN")
      .map((el) => ({ label: el.sn, value: el.sn }));

    setAvailableOptions(selectAvailableOptions);
  }, [availableData]);

  useEffect(() => {
    if (availableLoading === "rejected") toast.error("Произошла ошибка");
  }, []);

  function getNewData() {
    dispatch(fetchReport({ sn: selectedAvailable, date: selectedDate.format("YYYY-MM-HH") }));
  }

  return (
    <Flex align="center" gap={24}>
      {availableOptions.length && (
        <>
          <p>Выберите ВС</p>
          <CustomSelect
            options={availableOptions}
            defaultValue={availableOptions[0].value}
            onChange={(e) => {
              setSelectedAvailable(e);
              getNewData();
            }}
          />
        </>
      )}
      <p>Дата</p>
      <CustomDatePicker
        onCalendarChange={(e: any) => {
          setSelectedDate(e);
          getNewData();
        }}
        value={selectedDate}
      />
      <CustomButton type="primary" size="small">
        ↗ График
      </CustomButton>
    </Flex>
  );
}
