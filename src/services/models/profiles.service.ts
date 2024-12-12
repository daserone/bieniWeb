import service from "@services/services";

export abstract class ProfileService {
  static async getProfile(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "getPerfil",
          id: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getProfilesList(
    idUser: string,
    idPatient: string,
    familiarity: string
  ): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "getPerfiles",
          id: idUser,
          idpaciente: idPatient,
          imestamp: new Date().getTime(),
          parentesco: familiarity,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async geProfileData(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getFichaCompleta",
          id: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // edit
  static async getProfileEdition(
    idPatient: string,
    idUser: string
  ): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getPerfilEdicion",
          id: idPatient,
          idusuario: idUser,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getEducativeCenters(search: string): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "centros_educativos", busqueda: search },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  static async getEducativeGrades(): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "grados_educativos" },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getProvinces(): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "provincias" },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getDistricts(id: string | number): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "distritos", id: id },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getCorregimientos(id: string | number): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "corregimientos", id: id },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // export const serviciosRegistro = (form: any) =>
  //   servicesWh.post("/controller/registro.php", form, {
  //     responseType: "json",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });

  static async registerProfile(form: any): Promise<any> {
    try {
      const response = await service.post("/controller/registro.php", form, {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  // export const getFormatos = (tipo: any) =>
  //   servicesWh.get("/controller/combosback.php", {
  //     params: { op: "formatos_impresion", tipo },
  //     responseType: "json",
  //   });

  static async getFormats(type: string): Promise<any> {
    try {
      const response = await service.get("/controller/combosback.php", {
        params: { op: "formatos_impresion", tipo: type },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // {{Preproduccion}}controller/perfil.php?op=getQR&id=6437

  static async getQrUrl(id: string, isPet: boolean): Promise<any> {
    try {
      const url = isPet
        ? "controller/mascotas/perfil.php"
        : "controller/perfil.php";

      const response = await service.get(url, {
        params: { op: "getQR", id },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLinkedProfiles(
    idUser: string,
    idPatient: string
  ): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "getPerfilesVinculados",
          id: idUser,
          idpaciente: idPatient,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLinkedProfile(id: string): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "getPerfilVinculado",
          id: id,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getRequests(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "solicitudesAccesoPerfil",
          idpaciente: idPatient,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getProfileByCode(code: string, idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "getPerfilCodigo",
          codigo: code,
          idpaciente: idPatient,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async sendCode(form: any): Promise<any> {
    try {
      const response = await service.post("/controller/perfil.php", form, {
        responseType: "json",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // https://bieniwallet.com/bienibackdes/controller/perfil.php?op=numSolicitudesAccesoPerfil&idpaciente=2654

  static async getNumberOfRequest(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/perfil.php", {
        params: {
          op: "numSolicitudesAccesoPerfil",
          idpaciente: idPatient,
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getPatientDisability(id: string): Promise<any> {
    try {
      const response = await service.get("/controller/pacienteback.php", {
        params: {
          op: "getDiscapacidad",
          id: id,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.data) {
        return response.data;
      }
      throw new Error("Invalid response");
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
