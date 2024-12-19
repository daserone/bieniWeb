import CardListLayout from "@/components/card-list-layout/CardListLayout";
import { Treatment, useAllTreatments } from "@/hooks/useTreatmentsQuery";
import useUser from "@/hooks/useUser";
import {
  addDatesToTreatments,
  filterActiveTreatments,
  filterInactiveTreatments,
  getTreatmentName,
  handleBgColor,
} from "@/utils/treatmentsHelpers";
import { Breadcrumb, Col, Row, Typography } from "antd";
import { CSSProperties, useMemo } from "react";
import CustomCard from "./components/TreatmentCardGrid";
import { colors } from "@/theming/colors";
import useTreatmentView from "./hooks/useTreatmentView";
import BieniButton from "@/components/bieni-button/BieniButton";
import TodayTreatments from "./components/TodayTreatments";

const columns = [
  {
    title: "TRATAMIENTO",
    dataIndex: "treatment",
    key: "treatment",
    render: (text: string, row: any) => (
      <div style={styles.rowContent}>
        <div
          style={{
            ...styles.colorLine,
            backgroundColor: handleBgColor(row.id_type_treatment, true),
          }}
        ></div>
        <Typography.Text
          style={{
            color: colors.colorPrimary,
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {text}
        </Typography.Text>
      </div>
    ),
  },
  { title: "FRECUENCIA", dataIndex: "frequency", key: "frequency" },
  { title: "DURACIÓN", dataIndex: "duration", key: "duration" },
  { title: "FECHA DE INICIO", dataIndex: "start_date", key: "start_date" },
];

const TreatmentsView = () => {
  const { tabs, activeTreatments, inactiveTreatments } = useTreatmentView();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{ margin: "16px 20px" }}
          items={[{ title: "Mi salud" }, { title: "Tratamientos" }]}
        />
        <div style={{ width: "20%" }}>
          <BieniButton
            text="Agregar tratamiento"
            onPress={() => {}}
            height={30}
          />
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <CardListLayout
            customTabs={tabs}
            data={{
              lists: [activeTreatments, inactiveTreatments],
              columns: [columns, columns],
            }}
            CustomCard={CustomCard}
          />
        </Col>
        <Col span={10}>
          <TodayTreatments />
        </Col>
      </Row>
    </>
  );
};

export default TreatmentsView;

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
    gap: 10,
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
