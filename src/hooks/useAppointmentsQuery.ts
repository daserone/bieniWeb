import { QUERY_KEYS } from "@/utils/queryConstants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AppointmentsService } from "@/services/models/appointments.service";

// [
//   {
//       "id": "1799",
//       "idorigen": "0",
//       "origen": "interno",
//       "afiliado": "MiniMed Clínica Laboratorio",
//       "sede": null,
//       "servicio": "Consulta",
//       "nombre_profesional": "",
//       "year": "2024",
//       "hora": "06:00",
//       "fechaCita": "2024-12-16",
//       "fecha": "16 Dic",
//       "logo": "https://bieniwallet.com/bienibackdes/asset/minimed.png",
//       "tipo": "server",
//       "id_estado": "1"
//   },
//   {
//       "id": "1800",
//       "idorigen": "0",
//       "origen": "interno",
//       "afiliado": "Clínica Hospital Mar del Sur\n",
//       "sede": null,
//       "servicio": "Laboratorio",
//       "nombre_profesional": "Dr. Tem",
//       "year": "2024",
//       "hora": "10:30",
//       "fechaCita": "2024-12-17",
//       "fecha": "17 Dic",
//       "logo": "https://bieniwallet.com/bienibackdes/asset/mar_del_sur.jpg",
//       "tipo": "server",
//       "id_estado": "1"
//   }
// ]

export interface IAppointment {
  id: string;
  idorigen: string;
  origen: string;
  afiliado: string;
  sede: string;
  servicio: string;
  nombre_profesional: string;
  year: string;
  hora: string;
  fechaCita: string;
  fecha: string;
  logo: string;
  tipo: string;
  id_estado: string;
}

export const useLastAppointments = (id_patient: string, id_pet: string) => {
  return useQuery<IAppointment[]>({
    queryKey: [QUERY_KEYS.NEXT_APPOINTMENTS, id_patient, id_pet],
    queryFn: () =>
      AppointmentsService.getAppointments({
        idPatient: id_patient,
        idAfiliate: "",
        search: "",
        from: "",
        to: "",
        page: 0,
        nextDates: 1,
      }),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      return data.data ?? [];
    },
  });
};
