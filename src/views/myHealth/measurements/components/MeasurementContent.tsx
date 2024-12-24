import { colors } from "@/theming/colors";
import { IMeasurementCard } from "@/views/home/components/MeasurementList";
import { Radio, Typography, Card, Space, Spin } from "antd";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Line } from "@ant-design/charts";
import {
  MeasurementDetails,
  useMeasurementDetails,
} from "@/hooks/useMeasurementsQuery";
import useUser from "@/hooks/useUser";
import {
  getUnitLabel,
  obtenerImc,
  prepareDefaultData,
  prepareImcData,
  preparePresionData,
} from "@/utils/measurementsHelper";
import { transform } from "lodash-es";

interface MeasurementContentProps {
  selectedMeasurement: IMeasurementCard;
}

type TabPosition = "graph" | "table";
// altura
// :
// ""
// diastolica
// :
// 67
// fecha_creacion
// :
// "2024-09-20 10:57:18"
// id
// :
// 1672
// idtipomedicion
// :
// 2
// medicion
// :
// "Presión arterial"
// peso
// :
// ""
// sistema
// :
// "BW"
// sistolica
// :
// 102
// valor
// :
// ""

const MeasurementContent = ({
  selectedMeasurement,
}: MeasurementContentProps) => {
  const { Text } = Typography;
  const [mode, setMode] = useState<TabPosition>("graph");
  const { user } = useUser();
  const { data, isError, isLoading } = useMeasurementDetails(
    user.id,
    user.id_patient,
    user.id_pet,
    selectedMeasurement.id
  );

  const handleModeChange = (e: any) => {
    setMode(e.target.value);
  };

  const [measurementDetails, setMeasurementDetails] = useState<
    MeasurementDetails[]
  >([]);

  const [lineConfig, setLineConfig] = useState({});

  useEffect(() => {
    if (data) {
      let details = data.map((item) => {
        const newItem = { ...item };
        if (selectedMeasurement.id == 1) {
          newItem.imc = obtenerImc(newItem);
        }
        newItem.unit = getUnitLabel(newItem.idtipomedicion, user.isPet);
        return newItem;
      });
      setMeasurementDetails(details);
    }
  }, [data]);

  useEffect(() => {
    setLineConfig({
      data: {
        value: prepareChartData(measurementDetails),
        transform: [
          {
            type: "fold",
            fields:
              selectedMeasurement.id === 2
                ? ["sistolica", "diastolica"]
                : ["value"],
            key: "type",
            value: "value",
          },
        ],
      },
      xField: (d) => new Date(d.date),
      yField: "value",
      colorField: "type",
      point: {
        shapeField: "circle",
        sizeField: 3,
      },
      interaction: {
        tooltip: {
          marker: false,
        },
      },
      style: {
        lineWidth: 2,
      },
      scale: {
        color: {
          range: [colors.colorPrimary, colors.colorSecondary],
        },
      },
    });
  }, [measurementDetails]);

  //TODO CHART  DATA FROM API

  const prepareChartData = (data: MeasurementDetails[]) => {
    switch (selectedMeasurement.id) {
      case 1:
        return prepareImcData(data);
      case 2:
        return preparePresionData(data);
      default:
        return prepareDefaultData(data);
    }
  };

  return (
    <>
      <div style={styles.headerRow}>
        <Text style={styles.title}>{selectedMeasurement.title}</Text>
        <Radio.Group
          onChange={handleModeChange}
          value={mode}
          style={{ marginBottom: 8 }}
          buttonStyle="solid"
        >
          <Radio.Button value="graph">Gráfica</Radio.Button>
          <Radio.Button value="table">Historial</Radio.Button>
        </Radio.Group>
      </div>
      {mode === "graph" ? (
        <div style={{ width: "100%", minHeight: "300px" }}>
          {isLoading ? <Spin /> : <Line {...lineConfig} />}
        </div>
      ) : (
        <Card title="Pie Chart Demo" style={{ width: "100%" }}>
          <div style={{ width: "100%", minHeight: "300px" }}>
            {/* <Table {...pieConfig} /> */}
          </div>
        </Card>
      )}
    </>
  );
};

export default MeasurementContent;

const styles: { [key: string]: CSSProperties } = {
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.colorSecondary,
  },
};
