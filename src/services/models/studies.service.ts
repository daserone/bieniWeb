import service from "../services";

export abstract class StudiesService {
  //IMAGE
  static async getImages({
    idAfiliate,
    idUser,
    idPatient,
    search,
    from,
    to,
    page,
  }: {
    idAfiliate: string;
    idUser: string;
    idPatient: string;
    search: string;
    from: string;
    to: string;
    page: number;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getImagenologias",
          afiliado: idAfiliate,
          idusuario: idUser,
          idpaciente: idPatient,
          busqueda: search,
          desde: from,
          hasta: to,
          page: page,
          //lista: list,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      console.log("error", error);

      throw new Error(JSON.stringify(error));
    }
  }

  static async getImage({
    idImage,
    idPatient,
  }: {
    idImage: string;
    idPatient: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getImagenologia",
          idimagen: idImage,
          idpaciente: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getImagesStudies({
    idImage,
    idUser,
    idPatient,
  }: {
    idImage: string;
    idUser: string;
    idPatient: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "cargarImagenes",
          id: idImage,
          idpaciente: idPatient,
          idusuario: idUser,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getImageEdit({
    id,
    idUser,
    idPatient,
  }: {
    id: string;
    idUser: string;
    idPatient: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "imagenologiaEditar",
          id,
          idusuario: idUser,
          idpaciente: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLastImage({
    idPatient,
    idUser,
  }: {
    idPatient: string;
    idUser: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getUltimaImagenologia",
          idpaciente: idPatient,
          idusuario: idUser,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getImagesActualization({
    idUser,
    idPatient,
    document,
  }: {
    idUser: string;
    idPatient: string;
    document: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/actualizacion.php", {
        params: {
          op: "imagenologia",
          idusuario: idUser,
          idpaciente: idPatient,
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

  static async postAddImage({
    userId,
    idPatient,
    studie,
    idAffiliate,
    affiliateRef,
    date,
    files,
  }: {
    userId: string;
    idPatient: string;
    studie: string;
    idAffiliate: string;
    affiliateRef: string;
    date: string;
    files: any[];
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "addImagenologia");
      formData.append("idusuario", userId);
      formData.append("idpaciente", idPatient);
      formData.append("estudio", studie);
      formData.append("idafiliado", idAffiliate);
      formData.append("afiliadoReferencia", affiliateRef);
      formData.append("fechaEstudio", date);
      //   files.forEach(file => {
      //     if (file.file) {
      //       formData.append('file[]', file.file);
      //     }
      //   });
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async postEditImage({
    id,
    userId,
    idPatient,
    studie,
    idAffiliate,
    affiliateRef,
    date,
    files,
  }: {
    id: string;
    userId: string;
    idPatient: string;
    studie: string;
    idAffiliate: string;
    affiliateRef: string;
    date: string;
    files: any[];
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "editImagenologia");
      formData.append("id", id);
      formData.append("idusuario", userId);
      formData.append("idpaciente", idPatient);
      formData.append("idmascota", idPatient);
      formData.append("estudio", studie);
      formData.append("idafiliado", idAffiliate);
      formData.append("afiliadoReferencia", affiliateRef);
      formData.append("fechaEstudio", date);
      files.forEach((file) => {
        if (file.file) {
          formData.append("file[]", file.file);
        }
      });

      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async deletImage({
    id,
    userId,
    idPatient,
  }: {
    id: string;
    userId: string;
    idPatient: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "deletImagenologia");
      formData.append("id", id);
      formData.append("idusuario", userId);
      formData.append("idpaciente", idPatient);
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async deletImageFile({
    id,
    idUser,
    idPatient,
    file,
  }: {
    id: string;
    idUser: string;
    idPatient: string;
    file: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "imagenologiaEliminarArchivo");
      formData.append("id", id);
      formData.append("idusuario", idUser);
      formData.append("idpaciente", idPatient);
      formData.append("archivo", file);

      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async uploadFileImage({
    id,
    userId,
    idPatient,
    userEmail,
    file,
  }: {
    id: string;
    userId: string;
    idPatient: string;
    userEmail: string;
    file: any;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "upLoadFileImagenologia");
      formData.append("id", id);
      formData.append("idusuario", userId);
      formData.append("idpaciente", idPatient);
      formData.append("correo", userEmail);
      formData.append("file", file);
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  // LABS
  static async getLabs({
    idAfiliate,
    idPatient,
    search,
    from,
    to,
    page,
    //list,
    examenGrafico,
  }: {
    idPatient: string;
    search: string;
    from: string;
    to: string;
    page: number;
    //list: string;
    examenGrafico: string;
    idAfiliate: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getLaboratoriosListado",
          idpaciente: idPatient,
          afiliado: idAfiliate,
          busqueda: search,
          desde: from,
          hasta: to,
          page,
          //lista: list,
          examenGrafico,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener labs: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLabGraph({
    idAfiliate,
    idPatient,
    search,
    from,
    to,
    page,

    examenGrafico,
  }: {
    idAfiliate: string;
    idPatient: string;
    search: string;
    from: string;
    to: string;
    page: number;
    examenGrafico: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getLaboratorios",
          idpaciente: idPatient,
          afiliado: idAfiliate,
          busqueda: search,
          desde: from,
          hasta: to,
          page,
          examenGrafico,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLastLab(idPatient: string): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getUltimoLaboratorio",
          idpaciente: idPatient,
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getLabActualization({
    idUser,
    idPatient,
    document,
  }: {
    idUser: string;
    idPatient: string;
    document: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/actualizacion.php", {
        params: {
          op: "laboratorio",
          idusuario: idUser,
          idpaciente: idPatient,
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

  static async getLabEdit({
    id,
    idUser,
    idPatient,
  }: {
    id: string;
    idUser: string;
    idPatient: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "laboratorioEditar",
          id,
          idusuario: idUser,
          idpaciente: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getFirstTimeStudies({
    idUser,
    idPatient,
    document,
  }: {
    idUser: string;
    idPatient: string;
    document: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/actualizacion.php", {
        params: {
          op: "cargarEstudios",
          idusuario: idUser,
          idpaciente: idPatient,
          documento: document,
        },
        responseType: "json",
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(
          `Error al obtener first Time studies: ${response.statusText}`
        );
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async postAddLab({
    idPatient,
    studie,
    idAffiliate,
    affiliateRef,
    date,
    files,
  }: {
    idPatient: string;
    studie: string;
    idAffiliate: string;
    affiliateRef: string;
    date: string;
    files: any[];
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "addLaboratorio");
      formData.append("idpaciente", idPatient);
      formData.append("estudio", studie);
      formData.append("fechaEstudio", date);
      formData.append("idafiliado", idAffiliate);
      formData.append("afiliadoReferencia", affiliateRef);
      files.forEach((file) => {
        if (file.file) {
          formData.append("file[]", file.file);
        }
      });
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async postEditLab({
    id,
    idPatient,
    studie,
    idAffiliate,
    affiliateRef,
    date,
    files,
  }: {
    id: string;
    idPatient: string;
    studie: string;
    idAffiliate: string;
    affiliateRef: string;
    date: string;
    files: any[];
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "editLaboratorio");
      formData.append("id", id);
      formData.append("idpaciente", idPatient);
      formData.append("estudio", studie);
      formData.append("fechaEstudio", date);
      formData.append("idafiliado", idAffiliate);
      formData.append("afiliadoReferencia", affiliateRef);
      files.forEach((file) => {
        if (file.file) {
          formData.append("file[]", file.file);
        }
      });
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async deletLab({
    id,
    idUser,
    idPatient,
  }: {
    id: string;
    idUser: string;
    idPatient: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "deletLaboratorio");
      formData.append("id", id);
      formData.append("idusuario", idUser);
      formData.append("idpaciente", idPatient);
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async deletLabFile({
    id,
    idUser,
    idPatient,
    file,
  }: {
    id: string;
    idUser: string;
    idPatient: string;
    file: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "laboratorioEliminarArchivo");
      formData.append("id", id);
      formData.append("idusuario", idUser);
      formData.append("idpaciente", idPatient);
      formData.append("archivo", file);

      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async uploadFileLab({
    id,
    userId,
    idPatient,
    userEmail,
    file,
  }: {
    id: string;
    userId: string;
    idPatient: string;
    userEmail: string;
    file: any;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "upLoadFileLaboratorio");
      formData.append("id", id);
      formData.append("idusuario", userId);
      formData.append("idpaciente", idPatient);
      formData.append("correo", userEmail);
      formData.append("file", file);
      const response = await service.post(
        "/controller/estudios.php",
        formData,
        {
          responseType: "json",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al procesar add studie: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  //CONSULT
  static async getQueries({
    idAffiliate,
    idPatient,
    search,
    from,
    until,
    page,
    type,
  }: {
    idAffiliate: string;
    idPatient: string;
    search: string;
    from: string;
    until: string;
    page: string;
    type: string;
  }) {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getConsultas",
          afiliado: idAffiliate,
          idpaciente: idPatient,
          busqueda: search,
          desde: from,
          hasta: until,
          page: page,
          //lista: list,
          tipo: type,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data?.data ?? {};
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener Consult: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getConsultation({ idConsultation }: { idConsultation: string }) {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getConsultaDetalle",
          id: idConsultation,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data?.data ?? {};
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener Consult: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  //CATALOG
  static async getCatalogExamen({
    idPatient,
  }: {
    idPatient: string;
  }): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "getComboExamenes",
          idpaciente: idPatient,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  static async getCatalogValuesLab(): Promise<any> {
    try {
      const response = await service.get("/controller/estudios.php", {
        params: {
          op: "valoresLaboratorio",
          page: 1,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      if (response.status >= 200 && response.status < 300) {
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Invalid response");
        }
      } else {
        throw new Error(`Error al obtener affiliates: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
