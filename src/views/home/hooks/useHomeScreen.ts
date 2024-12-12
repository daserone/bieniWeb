import {
  useMeasurementDetails,
  useMeasurementReminder,
  useMeasurements,
} from "@/hooks/useMeasurementsQuery";
import useProfiles from "@/hooks/useProfiles";
import { useLastImage, useLastLab } from "@/hooks/useStudiesQuery";
import useUser from "@/hooks/useUser";
import {
  handleCardsMeasurements,
  handleCardsMeasurementsPets,
} from "@/utils/measurementsHelper";
import { useEffect, useMemo } from "react";

const useHomeScreen = () => {
  const { user } = useUser();
  const { data, isError, isLoading } = useMeasurements(
    user.id_patient,
    user.id_pet
  );

  const measurements = useMemo(() => {
    let newCards = user.isPet
      ? handleCardsMeasurementsPets(data ?? [])
      : handleCardsMeasurements(data ?? []);

    return newCards;
  }, [data]);

  const { fetchProfileAction, fetchProfilesAction } = useProfiles();

  const handleGetProfiles = () => {
    fetchProfileAction(user.id_patient);

    let userId =
      user.vinculado === 1 || user.vinculado === 2
        ? user.id_principal
        : user.id;
    let idPatient =
      user.vinculado === 1 || user.vinculado === 2
        ? user.id_paciente_principal
        : user.id_patient;

    fetchProfilesAction({
      idUser: userId,
      idPatient: idPatient,
      familiarity: "",
    });
  };

  useEffect(() => {
    handleGetProfiles();
  }, [user.id_patient]);

  return { measurements, isError, isLoading };
};

export default useHomeScreen;
