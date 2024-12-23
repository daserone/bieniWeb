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
      console.log("response", response.data);

      return response.data;
    } catch (error) {
      console.log("error details", error);

      throw new Error(JSON.stringify(error));
    }
  }

  static async getCompletedTreatments(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/tratamientos.php", {
        params: {
          op: "tratamientosCompletados",
          idpaciente: idPatient,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getTreatment(id: string): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getTratamiento",
          id,
        },
        responseType: "json",
      });

      return response.data;
    } catch (error) {
      console.log("error details", error);

      throw new Error(JSON.stringify(error));
    }
  }

  static async getDetailMedicine(id: any): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getMiMedicamentoDetail",
          id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      // console.log('response', response.data);

      return response.data;
    } catch (error) {
      console.log("error details", error);

      throw new Error(JSON.stringify(error));
    }
  }

  static async postTreatments(form: any): Promise<any> {
    try {
      const response = await service.post(
        "/controller/tratamientos.php",
        form,
        {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getTreatmentsFiles(id: any): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getTratamientosFiles",
          id,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getTreatmentMeasurements(id: any): Promise<any> {
    try {
      const response = await service.get("/controller/tratamientos.php", {
        params: {
          op: "getMediciones",
          id,
        },
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getMedicines(query: string): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: {
          op: "getMedicamentos",
          valor: query,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
