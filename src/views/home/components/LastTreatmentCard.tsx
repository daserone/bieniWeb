import { Treatment } from "@/hooks/useTreatmentsQuery";
import { colors } from "@/theming/colors";
import { getTreatmentName, handleBgColor } from "@/utils/treatmentsHelpers";
import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

interface TreatmentCardProps {
  treatment: Treatment;
  handleGoEditTreatment: (treatment: Treatment) => void;
  handleDeleteTreatment: (id: string) => void;
}

const TreatmentCard = ({
  treatment,
  handleGoEditTreatment,
  handleDeleteTreatment,
}: TreatmentCardProps) => {
  const handleGoToTreatment = () => {};

  const { Text } = Typography;

  return (
    <div style={styles.card}>
      {/* first row  */}
      <div style={styles.firstRow}>
        <div style={styles.rowContent}>
          {/* color line by treatment type  */}
          <div
            style={{
              ...styles.colorLine,
              backgroundColor: handleBgColor(treatment.idtipotratamiento, true),
            }}
          ></div>
          {/* content column  */}
          <div style={styles.contentColumn}>
            <Text style={styles.treatmentName}>
              {getTreatmentName(treatment)}
            </Text>
            {treatment.idtipotratamiento !== "1" ? (
              <div>
                <Text style={styles.text}>Fecha de inicio:</Text>
                <Text style={styles.text}> {treatment.fechainicio}</Text>
              </div>
            ) : (
              treatment.dosis !== "0" && (
                <Text style={styles.text}>
                  {treatment.dosis} {treatment.presentaciondosis}
                </Text>
              )
            )}

            {treatment.cada !== "0" ? (
              <Text style={styles.text}>
                Cada {treatment.cada} {treatment.tiempocada}
              </Text>
            ) : treatment.frecuenciadias !== "" ? (
              <Text style={styles.text}>{treatment.frecuenciadias}</Text>
            ) : treatment.frecuencia !== "0" ? (
              <Text style={styles.text}>{treatment.frecuencia}</Text>
            ) : null}
            {treatment.prolongado === "no" ? (
              treatment.duracion !== "0" ? (
                <Text style={styles.text}>Por {treatment.duracion} días</Text>
              ) : null
            ) : (
              <Text style={styles.text}>Tratamiento Permanente</Text>
            )}
          </div>
        </div>

        <RightOutlined color="red" />
      </div>
    </div>
  );
};

export default TreatmentCard;

const styles: { [key: string]: CSSProperties } = {
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    border: "1px solid #C3C1CA",
    color: colors.colorPrimary,
  },
  firstRow: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  colorLine: {
    display: "flex",
    height: 60,
    borderRadius: 30,
    minWidth: 5,
    maxWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  contentColumn: {
    display: "flex",
    marginLeft: 10,
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 10,
  },
  treatmentName: {
    fontSize: 14,
    color: colors.colorPrimary,
    fontWeight: "bold",
  },
  text: {
    color: colors.colorPrimary,
  },
};
