import React from "react";
import { Calendar } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";

const CallendarCmp: React.FC = () => {
  const onPanelChange = (
    value: Dayjs,
    mode: CalendarProps<Dayjs>["mode"]
  ) => {};

  return <Calendar onPanelChange={onPanelChange} />;
};

export default CallendarCmp;
