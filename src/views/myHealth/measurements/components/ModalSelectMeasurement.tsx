import { IMeasurementCard } from "@/views/home/components/MeasurementList";
import { Typography } from "antd";
import { CSSProperties } from "react";

interface ModalSelectMeasurementProps {
  handleClose: () => void;
  handleSelect: (measurement: IMeasurementCard) => void;
  measurements: IMeasurementCard[];
}

const ModalSelectMeasurement = ({
  handleClose,
  handleSelect,
  measurements,
}: ModalSelectMeasurementProps) => {
  const { Text } = Typography;

  return (
    <div style={styles.container}>
      <Text style={styles.title}>¿Qué medición deseas registrar?</Text>
      <div style={styles.measurementList}>
        {measurements.map((m) => (
          <div style={styles.measurement} key={m.id}>
            <div
              style={styles.measurementCircle}
              onClick={() => handleSelect(m)}
            >
              {m.Icon}
            </div>
            <Text style={styles.measurementLabel}>{m.title}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalSelectMeasurement;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: 20,
    fontWeight: 700,
    textAlign: "center",
    fontSize: 20,
  },
  measurementList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  measurement: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    width: "calc(33.33% - 20px)",
    justifyContent: "center",
    height: 130,
  },
  measurementCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 150,
    cursor: "pointer",
    background: "#E6E3FF",
  },
  measurementLabel: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: 700,
  },
};
