import service from "../services";

export abstract class MeasurementService {
  static async getLastMeasurements(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/mediciones.php", {
        params: {
          op: "getUltimasMediciones",
          idpaciente: idPatient,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      console.log(error, "Error mediciones ult");

      throw new Error(JSON.stringify(error));
    }
  }

  static async getMeasurements({
    idPatient,
    idUser,
    idTypeMeasurement,
  }: {
    idPatient: string;
    idUser: string;
    idTypeMeasurement: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/mediciones.php", {
        params: {
          op: "getMedicion",
          idpaciente: idPatient,
          idusuario: idUser,
          idtipomedicion: idTypeMeasurement,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      console.log(error, "Error mediciones");

      throw new Error(JSON.stringify(error));
    }
  }

  static async deleteMeasurement({
    id,
    idTypeMeasurement,
  }: {
    id: string;
    idTypeMeasurement: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "deleteMedicion");
      formData.append("id", id);
      formData.append("idtipomedicion", idTypeMeasurement);

      const response = await service.post(
        "/controller/mediciones.php",
        formData,
        {
          responseType: "json",
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async addMeasurement(form: any): Promise<any> {
    try {
      const response = await service.post("/controller/mediciones.php", form, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getMeasurementReminder({
    idPatient,
    idTypeMeasurement,
  }: {
    idPatient: string;
    idTypeMeasurement: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/mediciones.php", {
        params: {
          op: "getMedicionRecordatorio",
          idpaciente: idPatient,
          idtipomedicion: idTypeMeasurement,
        },
        responseType: "json",
      });
      console.log(response.data, "recordatorio");

      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async saveMeasurementReminder(form: any): Promise<any> {
    try {
      const response = await service.post("/controller/mediciones.php", form, {
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

  // https://bieniwallet.com/bienibackdes/controller/mediciones.php?op=deleteRecordatorioMedicion&id=40
  static async deleteMeasurementReminder(id: string): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "deleteRecordatorioMedicion");
      formData.append("id", id);
      const response = await service.post(
        "/controller/mediciones.php",
        formData,
        {
          responseType: "json",
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
