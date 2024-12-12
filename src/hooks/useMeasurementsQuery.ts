import { QUERY_KEYS } from "@/utils/queryConstants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { MeasurementService } from "@/services/models/measurement.service";

export const useMeasurements = (id_patient: string, id_pet: string) => {
  return useQuery<any[]>({
    queryKey: [QUERY_KEYS.MEASUREMENTS, id_patient, id_pet],
    queryFn: () => MeasurementService.getLastMeasurements(id_patient),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      return data.data ?? [];
    },
  });
};

export interface MeasurementDetails {
  altura: number;
  diastolica: string;
  fecha_creacion: string;
  id: number;
  idtipomedicion: number;
  medicion: string;
  peso: number;
  sistema: string;
  sistolica: string;
  valor: string;
  imc?: number;
  unit?: string;
}

//DETAILS
export const useMeasurementDetails = (
  id: string,
  id_patient: string,
  id_pet: string,
  measurementId: number
) => {
  return useQuery<MeasurementDetails[]>({
    queryKey: [QUERY_KEYS.MEASUREMENT_DETAILS, id_patient, id_pet],
    queryFn: () =>
      MeasurementService.getMeasurements({
        idPatient: id_patient,
        idUser: id,
        idTypeMeasurement: measurementId.toString(),
      }),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      return data.data ?? [];
    },
  });
};

//REMINDER
export const useMeasurementReminder = (
  id_patient: string,
  idTypeMeasurement: string
) => {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.MEASUREMENT_REMINDER, id_patient, idTypeMeasurement],
    queryFn: () =>
      MeasurementService.getMeasurementReminder({
        idPatient: id_patient,
        idTypeMeasurement: idTypeMeasurement,
      }),
    select: (data) => data.data,
    placeholderData: keepPreviousData,
  });
};
