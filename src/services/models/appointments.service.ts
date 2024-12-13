import service from "../services";

export abstract class AppointmentsService {
  // APPOINTMENTS
  static async getAppointments({
    idAfiliate,
    idPatient,
    search,
    type,
    from,
    to,
    page,
    nextDates,
  }: {
    idAfiliate: string;
    idPatient: string;
    search: string;
    type?: string;
    from: string;
    to: string;
    page: number;
    nextDates: number;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getCitas",
          afiliado: idAfiliate,
          idpaciente: idPatient,
          busqueda: search,
          tipo: type,
          desde: from,
          hasta: to,
          page,
          proximascitas: nextDates,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async deleteAppointment(id: string | number): Promise<any> {
    try {
      let form = new FormData();
      form.append("op", "citaDelete");
      form.append("id", id.toString());
      const response = await service.post("/controller/estudios.php", form, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getAppointmentDetail(id: string): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getCitaDetalle",
          id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getAppointmentEdit(id: string): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "citasEditar",
          id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLastAppointmentRg(
    idUser: string,
    idPatient: string,
    typeDocument: string | number,
    document: string
  ): Promise<any> {
    try {
      const response = await service.get("/controller/actualizacion.php", {
        params: {
          op: "citas",
          idusuario: idUser,
          idpaciente: idPatient,
          tipodocumento: typeDocument,
          documento: document,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async addItemsAppointment(form: any): Promise<any> {
    try {
      const response = await service.post("/controller/estudios.php", form, {
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
}
