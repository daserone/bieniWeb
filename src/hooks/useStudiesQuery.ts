import { LastImage, LastLab } from "@/models/studies.model";
import { StudiesService } from "@/services/models/studies.service";
import { QUERY_KEYS } from "@/utils/queryConstants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useLastImage = (
  id_patient: string,
  id_user: string,
  id_pet: string
) => {
  return useQuery<LastImage>({
    queryKey: [QUERY_KEYS.LAST_IMAGE, id_patient, id_pet],
    queryFn: () =>
      StudiesService.getLastImage({
        idPatient: id_patient,
        idUser: id_user,
      }),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      console.log(data, "last image");
      return data[0];
    },
  });
};

export const useLastLab = (id_patient: string, id_pet: string) => {
  return useQuery<LastLab>({
    queryKey: [QUERY_KEYS.LAST_LAB, id_patient, id_pet],
    queryFn: () => StudiesService.getLastLab(id_patient),
    placeholderData: keepPreviousData,
    select: (data: any) => {
      console.log(data, "last lab");

      return data[0];
    },
  });
};
