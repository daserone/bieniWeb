import { useMeasurements } from "@/hooks/useMeasurementsQuery";
import useUser from "@/hooks/useUser";
import {
  handleCardsMeasurementsPets,
  handleCardsMeasurements,
} from "@/utils/measurementsHelper";
import { Row, Col, Typography } from "antd";
import { CSSProperties, useMemo, useState } from "react";
import MeasurementCardVertical from "./MeasurementCardVertical";
import { IMeasurementCard } from "@/views/home/components/MeasurementList";
import MeasurementContent from "./MeasurementContent";
import CustomModal from "@/components/custom-modal/CustomModal";
import ModalSelectMeasurement from "./ModalSelectMeasurement";
import BieniButton from "@/components/bieni-button/BieniButton";

const MeasurementsContainer = () => {
  const { Title } = Typography;

  const { user } = useUser();
  const { data, isError, isLoading } = useMeasurements(
    user.id_patient,
    user.id_pet
  );

  const [measurements, setMeasurements] = useState<IMeasurementCard[]>([]);

  useMemo(() => {
    if (data) {
      if (user.id_pet) {
        setMeasurements(handleCardsMeasurementsPets(data));
      } else {
        setMeasurements(handleCardsMeasurements(data));
      }
    }
  }, [data]);

  const handleSelect = (id: number) => {
    let newMeasurements = measurements.map((m) => {
      if (m.id === id) {
        m.selected = !m.selected;
      } else {
        m.selected = false;
      }
      return m;
    });
    setMeasurements(newMeasurements);
  };

  let selectedMeasurement = measurements.find((m) => m.selected);

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title style={{ marginBottom: "1.2em", marginLeft: 20 }} level={4}>
          Mediciones
        </Title>
        <div style={{ width: "20%" }}>
          <BieniButton
            text="Agregar medición"
            onPress={() => {
              setVisible(true);
            }}
            height={30}
          />
        </div>
      </div>
      <div style={styles.container}>
        <Row>
          <Col span={6} style={styles.columnList}>
            {measurements.map((card, index) => (
              <MeasurementCardVertical
                measurement={card}
                isFirst={index === 0}
                isLast={index === measurements.length - 1}
                selected={card.selected}
                handleSelect={handleSelect}
              />
            ))}
          </Col>
          <Col
            span={18}
            style={{
              background: "#fff",
              padding: "20px",
            }}
          >
            {selectedMeasurement && (
              <MeasurementContent selectedMeasurement={selectedMeasurement} />
            )}
          </Col>
        </Row>
        <CustomModal
          isModalOpen={visible}
          onClose={() => setVisible(false)}
          children={
            <ModalSelectMeasurement
              handleClose={() => setVisible(false)}
              handleSelect={() => {}}
              measurements={measurements}
            />
          }
        />
      </div>
    </>
  );
};

export default MeasurementsContainer;

const styles: { [key: string]: CSSProperties } = {
  container: {
    borderRadius: 8,
    border: "1px solid #C3C1CA",
    boxShadow: "0px 1px 4px 0px rgba(118, 111, 143, 0.20)",
  },
  columnList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
  },
};
