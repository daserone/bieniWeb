import { useTodayTreatments } from "@/hooks/useTreatmentsQuery";
import useUser from "@/hooks/useUser";
import { colors } from "@/theming/colors";
import { todayDateShort } from "@/utils/dateHelpers";
import { Progress, Typography } from "antd";
import React, { CSSProperties } from "react";
import CompletedTreatments from "./CompletedTreatments";

const TodayTreatments = () => {
  const { user } = useUser();
  const today = new Date().toISOString().split("T")[0];
  const {
    data: treatments,
    isError,
    isLoading,
  } = useTodayTreatments(user.id_patient, today);

  const getCompletedBar = () => {
    if (!treatments) {
      return 0;
    }

    let completed = Number(
      treatments?.filter((t: { accion: string }) => t.accion === "registrar")
        .length
    );
    let total = Number(treatments?.length);

    //check nan
    if (Number.isNaN(completed) || Number.isNaN(total)) {
      return 0;
    }

    return isNaN(completed / total) ? 0 : completed / total;
  };

  const getPercentageCompleted = () => {
    if (!treatments) {
      return 0;
    }

    let completed = Number(
      treatments?.filter((t: { accion: string }) => t.accion === "registrar")
        .length
    );
    let total = Number(treatments.length);

    //check nan
    if (Number.isNaN(completed) || Number.isNaN(total)) {
      return 0;
    }

    return isNaN((completed / total) * 100)
      ? 0
      : Number((completed / total) * 100).toFixed(0);
  };

  const { Text } = Typography;
  console.log(treatments, "treatments");

  return (
    <div style={styles.container}>
      <Text style={styles.todayTitle}> Hoy, {todayDateShort()}</Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: colors.colorPrimary,
            fontWeight: "500",
          }}
        >
          Tratamientos completados
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: colors.colorPrimary,
            fontWeight: "500",
          }}
        >
          {getPercentageCompleted()}%
        </Text>
      </div>
      <Progress percent={getCompletedBar()} showInfo={false} />
      <CompletedTreatments tratamientos={treatments} />
    </div>
  );
};

export default TodayTreatments;

const styles: { [key: string]: CSSProperties } = {
  container: {
    borderRadius: 16,
    border: "1px solid #C3C1CA",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: 16,
  },
  todayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.colorPrimary,
    marginBottom: 10,
  },
};
