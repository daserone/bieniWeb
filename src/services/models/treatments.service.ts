import service from "../services";

export abstract class TreatmentsService {
  static async getTreatments({
    idPatient,
    page,
    query,
  }: {
    idPatient: string;
    page: number;
    query?: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getTratamientos",
          id: idPatient,
          page,
          buscador: query,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getTodayTreatments({
    idPatient,
    date,
  }: {
    idPatient: string;
    date: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/tratamientos.php", {
        params: {
          op: "tratamientosDelDia",
          idpaciente: idPatient,
          fecha: date,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
