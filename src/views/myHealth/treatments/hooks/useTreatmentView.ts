import { useMemo } from "react";
import { useAllTreatments, Treatment } from "@/hooks/useTreatmentsQuery";
import useUser from "@/hooks/useUser";
import {
  getTreatmentName,
  addDatesToTreatments,
  filterActiveTreatments,
  filterInactiveTreatments,
} from "@/utils/treatmentsHelpers";

const useTreatmentView = () => {
  const tabs = [
    { text: "Activos", active: true },
    { text: "Inactivos", active: false },
  ];

  const { user } = useUser();

  const {
    data: treatments,
    isError,
    isLoading,
  } = useAllTreatments(user.id_patient, user.id_pet);

  const mapTreatmentToTable = (treatments: Treatment[]) => {
    return treatments.map((treatment) => {
      return {
        key: treatment.id,
        treatment: getTreatmentName(treatment),
        frequency:
          treatment.cada !== "0"
            ? `Cada ${treatment.cada} ${treatment.tiempocada}`
            : treatment.frecuenciadias !== ""
            ? treatment.frecuenciadias
            : treatment.frecuencia !== "0"
            ? treatment.frecuencia
            : null,
        duration: `${treatment.duracion} días`,
        start_date: treatment.fechainicio,
        treatment_type: treatment.nombretipotratamiento,
        motive: treatment.motivo,
        id_type_treatment: treatment.idtipotratamiento,
      };
    });
  };

  const activeTreatments = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];
    if (!treatments) return [];
    // first add dates to treatments
    const treatmentsWithDates = addDatesToTreatments(treatments);
    // filter active treatments
    const activeTreatments = filterActiveTreatments(treatmentsWithDates);
    return mapTreatmentToTable(activeTreatments);
  }, [treatments, isLoading, isError]);

  const inactiveTreatments = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];
    if (!treatments) return [];
    // first add dates to treatments
    const treatmentsWithDates = addDatesToTreatments(treatments);
    // filter active treatments
    const inactiveTreatments = filterInactiveTreatments(treatmentsWithDates);
    return mapTreatmentToTable(inactiveTreatments);
  }, [treatments, isLoading, isError]);

  return {
    activeTreatments,
    inactiveTreatments,
    tabs,
  };
};

export default useTreatmentView;
