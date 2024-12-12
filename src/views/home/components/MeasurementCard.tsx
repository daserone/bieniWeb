import { Typography } from "antd";
import { CSSProperties } from "react";
import { IMeasurementCard } from "./MeasurementList";
import { colors } from "@/theming/colors";
import { getImcTextValue } from "@/utils/measurementsHelper";
import useProfiles from "@/hooks/useProfiles";

interface MeasurementCard {
  measurement: IMeasurementCard;
}

function MeasurementCard({ measurement }: MeasurementCard) {
  const { currentProfile } = useProfiles();
  const sexo = currentProfile?.sexo;

  const { Text } = Typography;
  return (
    <div style={styles.container}>
      <Text style={styles.title}>{measurement.title}</Text>
      <Text style={styles.value}>
        {measurement.value === "" ? 0 : measurement.value}{" "}
        <Text style={styles.unit}>
          {measurement.id === 1
            ? getImcTextValue(parseInt(measurement.value), sexo)
            : measurement.unit}
        </Text>
      </Text>
    </div>
  );
}

export default MeasurementCard;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    padding: "24px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    flex: "1 0 0",
    alignSelf: "stretch",
    borderRadius: "7.584px",
    border: "0.758px solid var(--Neutral-300, #C3C1CA)",
    background: "#FFF",
  },
  title: {
    color: colors.colorSecondary,
    fontSize: 12,
  },
  value: {
    color: colors.colorPrimary,
    fontSize: 24,
    fontWeight: 700,
  },
  unit: {
    color: colors.colorSecondary,
    fontSize: 12,
  },
};
