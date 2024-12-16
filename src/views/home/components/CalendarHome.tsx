import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import React from "react";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
  console.log(value.format("YYYY-MM-DD"), mode);
};

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is warning event." },
        { type: "success", content: "This is usual event." },
        { type: "error", content: "This is error event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is warning event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = (value: Dayjs) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const dateCellRender = (value: Dayjs) => {
  const listData = getListData(value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        position: "absolute",
        top: 25,
        left: 4,
        flexWrap: "wrap",
        height: 20,
        width: 20,
        gap: 2,
      }}
    >
      {listData.map((item) => (
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: 5,
            backgroundColor:
              item.type === "warning"
                ? "yellow"
                : item.type === "error"
                ? "red"
                : "green",
          }}
        />
      ))}
    </div>
  );
};

const CalendarHome = () => {
  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid #C3C1CA`,
    borderRadius: 8,
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <div style={wrapperStyle}>
        <Calendar
          mode="month"
          cellRender={cellRender}
          fullscreen={false}

          //   onPanelChange={onPanelChange}
        />
      </div>
    </div>
  );
};

export default CalendarHome;
