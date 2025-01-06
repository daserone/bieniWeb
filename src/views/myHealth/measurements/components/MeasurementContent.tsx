import { colors } from "@/theming/colors";
import { IMeasurementCard } from "@/views/home/components/MeasurementList";
import { Radio, Typography, Spin, Table } from "antd";
import { CSSProperties, useEffect, useState } from "react";
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
import {
  formatDateMeasurementHistory,
  formatShortDate,
} from "@/utils/dateHelpers";

interface MeasurementContentProps {
  selectedMeasurement: IMeasurementCard;
}

type TabPosition = "graph" | "table";

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

  const [tableData, setTableData] = useState([]);

  const [lineConfig, setLineConfig] = useState({});

  useEffect(() => {
    if (data) {
      console.log("data details", data);

      let details = data.map((item) => {
        const newItem = { ...item };
        if (selectedMeasurement.id == 1) {
          newItem.imc = obtenerImc(newItem);
        }
        newItem.unit = getUnitLabel(newItem.idtipomedicion, user.isPet);
        return newItem;
      });
      setMeasurementDetails(details);
      setTableData(prepareTableData(details));
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

  const columns = [
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Dia y hora",
      dataIndex: "fecha_creacion",
      key: "fecha_creacion",
    },
    {
      title: "Tendencia",
      dataIndex: "tendencia",
      key: "tendencia",
    },
  ];

  const prepareTableData = (data: MeasurementDetails[]) => {
    return data.map((item) => {
      return {
        key: item.id,
        valor:
          selectedMeasurement.id === 1
            ? item.imc
            : selectedMeasurement.id === 2
            ? `${item.sistolica}/${item.diastolica} ${item.unit}`
            : `${item.valor} ${item.unit}`,
        fecha_creacion: formatDateMeasurementHistory(item.fecha_creacion),
        tendencia: "Tendencia",
      };
    });
  };

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
      {isLoading ? (
        <Spin />
      ) : isError ? (
        <Text>Ha ocurrido un error</Text>
      ) : mode === "graph" ? (
        <div style={{ width: "100%", minHeight: "300px" }}>
          <Line {...lineConfig} />
        </div>
      ) : (
        <div style={{ width: "100%", minHeight: "300px" }}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{ pageSize: 5 }}
          />
        </div>
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
