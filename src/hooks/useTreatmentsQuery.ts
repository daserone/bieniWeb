import { QUERY_KEYS } from "@/utils/queryConstants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { TreatmentsService } from "@/services/models/treatments.service";

// cada
// :
// "6"
// consiste
// :
// ""
// diagnostico
// :
// null
// documento
// :
// null
// dosis
// :
// "Dosis: 10, Presentación: Jarabe, Concentración: 100ml"
// duracion
// :
// "7"
// fechafin
// :
// "2024-06-24"
// fechainicio
// :
// "2024-06-18"
// frecuencia
// :
// "Intervalos Específicos"
// frecuenciadias
// :
// ""
// frecuenciahoras
// :
// ""
// horainicio
// :
// "11:00:00"
// id
// :
// "455"
// idalergia
// :
// null
// idconsiste
// :
// null
// idenfermedad
// :
// null
// idmedicamento
// :
// "580"
// idmotivo
// :
// "5"
// idpaciente
// :
// "2654"
// idtipotratamiento
// :
// "1"
// idviaadministracion
// :
// null
// medicamento
// :
// "Asprax (Hedera helix)"
// motivo
// :
// "Síntomas"
// motivotratamiento
// :
// null
// nombreconsiste
// :
// ""
// nombretipotratamiento
// :
// "Medicamentos"
// notas
// :
// ""
// presentaciondosis
// :
// "Jarabe"
// prolongado
// :
// "no"
// recordatorio
// :
// "activo"
// tiempocada
// :
// "Horas"
// totaldosis
// :
// "0"
// tratamiento_hoy
// :
// "0"
// viaadministracion
// :
// null

export interface Treatment {
  cada: string;
  consiste: string;
  diagnostico: string;
  documento: string;
  dosis: string;
  duracion: string;
  fechafin: string;
  fechainicio: string;
  frecuencia: string;
  frecuenciadias: string;
  frecuenciahoras: string;
  horainicio: string;
  id: string;
  idalergia: string;
  idconsiste: string;
  idenfermedad: string;
  idmedicamento: string;
  idmotivo: string;
  idpaciente: string;
  idtipotratamiento: string;
  idviaadministracion: string;
  medicamento: string;
  motivo: string;
  motivotratamiento: string;
  nombreconsiste: string;
  nombretipotratamiento: string;
  notas: string;
  presentaciondosis: string;
  prolongado: string;
  recordatorio: string;
  tiempocada: string;
  totaldosis: string;
  tratamiento_hoy: string;
  viaadministracion: string;
}

export const useAllTreatments = (
  id_patient: string,
  id_pet: string,
  page = 0,
  query = ""
) => {
  return useQuery<Treatment[]>({
    queryKey: [QUERY_KEYS.TREATMENTS, id_patient, id_pet],
    queryFn: () =>
      TreatmentsService.getTreatments({ idPatient: id_patient, page, query }),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      console.log(data, "all treatments");

      return data.data ?? [];
    },
  });
};
export interface TodayTreatment {
  hora: string;
  accion: string;
  nombretipotratamiento: string;
}
// by date
export const useTodayTreatments = (id_patient: string, date: string) => {
  return useQuery<TodayTreatment[]>({
    queryKey: [QUERY_KEYS.TREATMENTS_BY_DATE, id_patient, date],
    queryFn: () =>
      TreatmentsService.getTodayTreatments({ idPatient: id_patient, date }),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      console.log(data, "today treatments");

      return data ?? [];
    },
  });
};
