import { TodayTreatment } from "@/hooks/useTreatmentsQuery";
import { colors } from "@/theming/colors";
import { Typography } from "antd";
import React, { CSSProperties, useEffect, useState } from "react";
import {
  SunOutlined,
  MoonOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";

const tabList = [
  {
    id: 1,
    name: "A.M.",
    icon: "sun",
    selected: true,
  },
  {
    id: 2,
    name: "P.M.",
    icon: "moon",
    selected: false,
  },
];

interface CompletedTreatmentsProps {
  tratamientos: TodayTreatment[];
}

const CompletedTreatments = ({ tratamientos }: CompletedTreatmentsProps) => {
  const [tabs, setTabs] = useState(tabList);
  const [selectedTab, setSelectedTab] = useState(1);

  // treatment groups am and pm
  const tratamientosAMGroup = tratamientos?.filter(
    (tratamiento) => parseInt(tratamiento?.hora?.split(":")[0]) < 12
  );
  const tratamientosPMGroup = tratamientos?.filter(
    (tratamiento) => parseInt(tratamiento?.hora?.split(":")[0]) >= 12
  );

  const handleTab = (id: number) => {
    const newTabs = tabs.map((tab) => {
      if (tab.id === id) {
        tab.selected = true;
      } else {
        tab.selected = false;
      }
      setSelectedTab(id);
      return tab;
    });
    setTabs(newTabs);
  };

  const formatHour = (hour: string) => {
    const hourArray = hour.split(":");
    const hourNumber = parseInt(hourArray[0]);

    let hourString = hourNumber > 12 ? `${hourNumber - 12}` : `${hourNumber}`;
    // if hour less than 10 add 0 to first position
    if (parseInt(hourString) < 10) {
      hourString = `0${hourString}`;
    }

    const minuteString = hourArray[1];

    return `${hourString}:${minuteString}`;
  };
  const getArrayBySelectedTab = () => {
    if (selectedTab === 1) {
      return tratamientosAMGroup ?? [];
    } else {
      return tratamientosPMGroup ?? [];
    }
  };

  useEffect(() => {
    //if am set tab to am else to pm
    const hour = new Date().getHours();
    if (hour < 12) {
      handleTab(1);
    } else {
      handleTab(2);
    }
  }, []);

  const { Text } = Typography;

  const CompletedTreatmentsList = () => {
    const data = getArrayBySelectedTab();

    return (
      <div style={styles.treatmentsContainer}>
        {data.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay tratamientos programados para esta hora
          </Text>
        ) : (
          data.map((item, idx) => (
            <div
              key={idx.toString()}
              style={{ ...styles.containerRow, marginTop: 5, marginBottom: 5 }}
            >
              <div style={styles.containerRow}>
                <div style={{ width: "20%" }}>
                  <Text
                    style={{
                      ...styles.treatmentHour,
                      color:
                        item.accion === "registrar"
                          ? colors.colorTertiary
                          : colors.colorPrimary,
                    }}
                  >
                    {formatHour(item.hora)}
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={
                      item.accion === "registrar"
                        ? styles.treatmentTextCompleted
                        : styles.treatmentText
                    }
                  >
                    {item.nombretipotratamiento}
                  </Text>
                  <div>
                    {item.accion !== "N/R" &&
                      (item.accion === "saltar" ? (
                        <CloseCircleFilled
                          style={{ color: colors.colorError, fontSize: 20 }}
                        />
                      ) : (
                        <CheckCircleFilled
                          style={{ color: colors.colorSuccess, fontSize: 20 }}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* tabs  */}
      <div style={styles.tabsTreatment}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            style={{
              ...styles.tab,
              borderBottom: `1px solid ${
                tab.selected ? colors.colorPrimary : "#C3C1CA"
              }`,
            }}
          >
            <div style={styles.containerRow}>
              {tab.id === 1 ? (
                <SunOutlined
                  style={{
                    color: tab.selected
                      ? colors.colorPrimary
                      : colors.colorSecondary,
                  }}
                />
              ) : (
                <MoonOutlined
                  style={{
                    color: tab.selected
                      ? colors.colorPrimary
                      : colors.colorSecondary,
                  }}
                />
              )}

              <Text
                style={{
                  ...styles.tabText,
                  color: tab.selected
                    ? colors.colorPrimary
                    : colors.colorSecondary,
                }}
                onClick={() => handleTab(tab.id)}
              >
                {tab.name}
              </Text>
            </div>
          </div>
        ))}
      </div>
      {/* treatments container  */}

      <CompletedTreatmentsList />
    </div>
  );
};

export default CompletedTreatments;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    border: "1px solid #C3C1CA",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  tabsTreatment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #C3C1CA",
  },
  tab: {
    padding: 10,
    cursor: "pointer",
    borderBottom: "1px solid #C3C1CA",
    width: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  treatmentsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 10,
    maxHeight: "40vh",
    overflowY: "auto",
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  treatmentHour: {
    fontSize: 16,
    fontWeight: "bold",
  },
  treatmentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  treatmentTextCompleted: {
    fontSize: 16,
    fontWeight: "bold",
    textDecoration: "line-through",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
  },
};
