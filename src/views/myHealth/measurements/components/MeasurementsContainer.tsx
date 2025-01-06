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
import ModalAddMeasurement, {
  MeasurementFormByID,
  MeasurementID,
} from "./ModalAddMeasurement";
import {
  cardsMeasurements,
  cardsMeasurementsPets,
} from "@/models/measurements.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MeasurementService } from "@/services/models/measurement.service";
import { QUERY_KEYS } from "@/utils/queryConstants";
import useToast from "@/hooks/useToast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const MeasurementsContainer = () => {
  const { Title } = Typography;

  const { user } = useUser();
  const { data, isError, isLoading } = useMeasurements(
    user.id_patient,
    user.id_pet
  );
  console.log(isError, "isError");

  const [measurements, setMeasurements] = useState<IMeasurementCard[]>([]);

  useMemo(() => {
    console.log("data", data);

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
        m.selected = true;
      } else {
        m.selected = false;
      }
      return m;
    });
    setMeasurements(newMeasurements);
  };

  let selectedMeasurement = measurements.find((m) => m.selected);

  const [visible, setVisible] = useState(false);

  const [isAddMeasurementModalOpen, setIsAddMeasurementModalOpen] =
    useState(false);

  const handleTitle = () => {
    switch (selectedMeasurement.title) {
      case "Frecuencia Respiratoria":
        return "F. Respiratoria";
      case "Frecuencia Cardíaca":
        return "F. Cardíaca";
      case "Saturación de Oxigeno":
        return "S. Oxigeno";
      default:
        return selectedMeasurement.title;
    }
  };

  const { showToastError, showToastSuccess } = useToast();

  const queryClient = useQueryClient();

  const measureMutation = useMutation({
    mutationFn: MeasurementService.addMeasurement,
    onSuccess: async (res) => {
      console.log(res);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEASUREMENTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MEASUREMENT_DETAILS],
      });

      showToastSuccess("Medición agregada correctamente");
      setIsAddMeasurementModalOpen(false);
    },
    onError: (err) => {
      console.log(err);

      showToastError("Error al agregar la medición");
    },
  });

  const handleAddMeasure = async <T extends MeasurementID>(
    idMeasurement: T,
    formData: MeasurementFormByID<T>
  ): Promise<void> => {
    // queryClient.invalidateQueries({
    //   queryKey: [QUERY_KEYS.MEASUREMENTS],
    // });
    // queryClient.invalidateQueries({
    //   queryKey: [QUERY_KEYS.MEASUREMENT_DETAILS],
    // });
    let form = new FormData();
    //op
    form.append("op", "addMedicion");
    form.append("idtipomedicion", selectedMeasurement.id.toString());
    form.append("idusuario", user.id);
    form.append("idpaciente", user.id_patient);
    if (idMeasurement === "pressure") {
      const data = formData as MeasurementFormByID<"pressure">;
      form.append("sistolica", data.sistolica);
      form.append("diastolica", data.diastolica);
    }
    if (idMeasurement === "imc") {
      const data = formData as MeasurementFormByID<"imc">;
      form.append("altura", data.talla);
      form.append("peso", data.peso);
    }

    let cards = user.isPet ? cardsMeasurementsPets : cardsMeasurements;
    if (idMeasurement === "value") {
      const data = formData as MeasurementFormByID<"value">;
      // formvalue in cardsMeasurements where id == measurementId
      form.append(
        cards.find((card) => card.id === selectedMeasurement.id)?.formValue ??
          "",
        data.value
      );
    }
    measureMutation.mutateAsync(form);
  };

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
                key={card.id}
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
              handleSelect={(measurement) => {
                setVisible(false);
                handleSelect(measurement.id);
                setIsAddMeasurementModalOpen(true);
              }}
              measurements={measurements}
            />
          }
        />
        {selectedMeasurement && (
          <CustomModal
            isModalOpen={isAddMeasurementModalOpen}
            onClose={() => setIsAddMeasurementModalOpen(false)}
            children={
              <ModalAddMeasurement
                idMeasurement={
                  selectedMeasurement.id == 1
                    ? "imc"
                    : selectedMeasurement.id == 2
                    ? "pressure"
                    : "value"
                }
                title={handleTitle()}
                handleAdd={(val: any) => {
                  handleAddMeasure(
                    selectedMeasurement.id == 1
                      ? "imc"
                      : selectedMeasurement.id == 2
                      ? "pressure"
                      : "value",
                    val
                  );
                }}
                unit={selectedMeasurement.unit}
                defaultValues={
                  // measurementDetails && measurementDetails.length > 0
                  //   ? handleDefaultValues()
                  // :
                  undefined
                }
              />
            }
          />
        )}
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
