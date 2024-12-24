import { Typography } from "antd";
import { CSSProperties } from "react";
import { colors } from "@theming/colors";
import { getImcTextValue } from "@utils/measurementsHelper";
import useProfiles from "@hooks/useProfiles";
import { IMeasurementCard } from "@/views/home/components/MeasurementList";

interface MeasurementCardVertical {
  measurement: IMeasurementCard;
  isFirst: boolean;
  isLast: boolean;
  selected: boolean;
  handleSelect?: (id: number) => void;
}

function MeasurementCardVertical({
  measurement,
  isFirst,
  isLast,
  selected,
  handleSelect,
}: MeasurementCardVertical) {
  const { currentProfile } = useProfiles();
  const sexo = currentProfile?.sexo;

  const { Text } = Typography;
  return (
    <div
      onClick={() => handleSelect && handleSelect(measurement.id)}
      style={{
        ...styles.container,
        borderRadius: isFirst ? "8px 0 0 0" : isLast ? "0 0 0 8px" : "0",
        background: selected ? "#E6E3FF" : "#FFF",
        // border only right and bottom if not last
        borderRight: "0.758px solid var(--Neutral-300, #C3C1CA)",
        borderBottom: isLast
          ? "0"
          : "0.758px solid var(--Neutral-300, #C3C1CA)",
        borderLeft: "none",
        borderTop: "none",
      }}
    >
      <Text style={styles.title}>{measurement.title}</Text>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.value}>
          {measurement.value === "" ? 0 : measurement.value}{" "}
          <Text style={styles.unit}>
            {measurement.id === 1
              ? getImcTextValue(parseInt(measurement.value), sexo)
              : measurement.unit}
          </Text>
        </Text>
      </div>
    </div>
  );
}

export default MeasurementCardVertical;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    padding: "24px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    flex: "1 0 0",
    alignSelf: "stretch",
    border: "0.758px solid var(--Neutral-300, #C3C1CA)",
    background: "#FFF",
    height: "130px",
  },
  title: {
    color: colors.colorSecondary,
    fontSize: 12,
  },
  value: {
    color: colors.colorPrimaryDark,
    fontSize: 24,
    fontWeight: 700,
  },
  unit: {
    color: colors.colorSecondary,
    fontSize: 12,
  },
};
