interface FormDataWithParts extends FormData {
  _parts?: [string, any][];
}

const validOperations = {
  laboratorios: [
    "getLaboratoriosListado",
    "getUltimoLaboratorio",
    "getLaboratorios",
    "getComboExamenes",
    "valoresLaboratorio",
    "addLaboratorio",
    "laboratorioEditar",
    "editLaboratorio",
    "laboratorioEliminarArchivo",
    "upLoadFileLaboratorio",
    "deletLaboratorio",
  ],
  imagenologias: [
    "getImagenologias",
    "getUltimaImagenologia",
    "getImagenologia",
    "cargarImagenes",
    "addImagenologia",
    "imagenologiaEditar",
    "editImagenologia",
    "imagenologiaEliminarArchivo",
    "upLoadFileImagenologia",
    "deletImagenologia",
  ],
  citas: [
    "getCitas",
    "getCitaDetalle",
    "addCitaInterna",
    "editCitaInterna",
    "addNote",
    "deleteNote",
    "citaDelete",
    "deletReferenciasFile",
    "guardarActualizarImagenes",
    "guardarActualizarItemJson",
  ],
  alergias: [
    "getAlergias",
    "addAlergias",
    "toggleAlergias",
    "deletAlergias",
    "noTengo",
  ],
  perfil: [
    "getFichaCompleta",
    "getPerfilEdicion",
    "editMascota",
    "upLoadFile",
    "getTipoPerfil",
    "deletePaciente",
  ],
  enfermedades: ["enfermedades", "add", "delete", "noTengo"],
  tratamientos: [
    "getTratamientos",
    "tratamientosDelDia",
    "tratamientosCompletados",
    "getTratamiento",
    "editMedicamento",
    "addMedicamento",
    "addTratamiento",
    "editTratamiento",
    "deletTratamiento",
    "posponerMedicion",
    "registrarMedicion",
    "saltarMedicion",
    "getTratamientosFiles",
    "getMediciones",
    "getMiMedicamentoDetail",
  ],
  mediciones: [
    "getUltimasMediciones",
    "getMedicion",
    "addMedicion",
    "deleteMedicion",
    "getMedicionRecordatorio",
    "actualizarNotificacion",
    "agregarNotificacion",
  ],
};

abstract class ModifyPetsRequestService {
  protected listPetsUrlToModify: { url: string; key: string }[] = [
    { url: "controller/vacunas.php", key: "vacunas" },
    { url: "controller/perfil.php", key: "perfil" },
    { url: "controller/estudios.php", key: "estudios" },
    { url: "controller/recetas.php", key: "recetas" },
    { url: "controller/pacienteback.php", key: "pacientes" },
    { url: "controller/medicosback.php", key: "veterinarios" },
    { url: "controller/contactosEmergencia.php", key: "contactos" },
    { url: "controller/tratamientos.php", key: "tratamientos" },
    { url: "controller/aseguradora.php", key: "aseguradora" },
    { url: "controller/mediciones.php", key: "mediciones" },
    { url: "controller/alergias.php", key: "alergias" },
    { url: "controller/enfermedades.php", key: "enfermedades" },
    // Add more URLs here
  ];

  protected modifyRequestURL(url: string, op?: string): string {
    // Check if URL is estudios.php and op matches any operation in validOperations

    if (url.includes("controller/estudios.php") && op) {
      if (validOperations.laboratorios.includes(op)) {
        return url.replace(
          "controller/estudios",
          "controller/mascotas/laboratorios"
        );
      } else if (validOperations.imagenologias.includes(op)) {
        return url.replace(
          "controller/estudios",
          "controller/mascotas/imagenologias"
        );
      } else if (validOperations.citas.includes(op)) {
        return url.replace("controller/estudios", "controller/mascotas/citas");
      }
    }
    //if pacienteback and op matches perfil or treatments operations
    if (url.includes("controller/pacienteback.php") && op) {
      // if perfil operations
      if (validOperations.perfil.includes(op)) {
        return url.replace(
          "controller/pacienteback",
          "controller/mascotas/perfil"
        );
      }
      //tratamientos
      if (validOperations.tratamientos.includes(op)) {
        return url.replace(
          "controller/pacienteback",
          "controller/mascotas/tratamientos"
        );
      }
    }
    // Check if URL is medicosback and replace accordingly
    if (url.includes("controller/medicosback")) {
      return url.replace(
        "controller/medicosback",
        "controller/mascotas/veterinarios"
      );
    }
    // Default replacement for other URLs
    return url.replace("controller", "controller/mascotas");
  }

  protected formDataToObject(formData: FormDataWithParts): any {
    try {
      const formDataObject: any = {};
      if (formData._parts) {
        formData._parts.forEach(([key, value]) => {
          // Check if the key ends with '[]' indicating multiple files
          if (key.endsWith("[]")) {
            const cleanKey = key.slice(0, -2); // Remove the '[]' part
            if (formDataObject[cleanKey]) {
              // If the key exists and is an array, push the new value
              if (Array.isArray(formDataObject[cleanKey])) {
                formDataObject[cleanKey].push(value);
              } else {
                // If the key exists but is not an array, convert it to an array and add the new value
                formDataObject[cleanKey] = [formDataObject[cleanKey], value];
              }
            } else {
              // If the key does not exist, initialize it as an array with the first value
              formDataObject[cleanKey] = [value];
            }
          } else {
            if (formDataObject[key]) {
              // If the key exists and is an array, push the new value
              if (Array.isArray(formDataObject[key])) {
                formDataObject[key].push(value);
              } else {
                // If the key exists but is not an array, convert it to an array and add the new value
                formDataObject[key] = [formDataObject[key], value];
              }
            } else {
              // If the key does not exist, simply add the key-value pair
              formDataObject[key] = value;
            }
          }
        });
      } else {
        throw new Error("FormData does not support _parts");
      }
      return formDataObject;
    } catch (error) {
      console.log("error", error);
      return formData;
    }
  }

  protected objectToFormData(obj: any): FormData {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (Array.isArray(value)) {
          value.forEach((item: any) => {
            formData.append(`${key}[]`, item);
          });
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }
  //VACUNAS
  protected modifyForOperationVacunas(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getVacunas":
        return { ...obj, idusuario: undefined, idmascota: idPet };
      case "addVacuna":
        return {
          ...obj,
          idusuario: undefined,
          idmascota: idPet,
          idpaciente: undefined,
          categoria: undefined,
        };
      case "getCartilla":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
          idusuario: undefined,
        };
        break;
      case "getCartillas":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
          idusuario: undefined,
        };
      case "getVacuna":
        return { ...obj, idmascota: idPet };
      case "getVacunasPacientes":
        return {
          ...obj,
          idmascota: idPet,
          op: "getVacunasMascotas",
          idpaciente: undefined,
        };
      case "getVacunaPaciente":
        return {
          ...obj,
          idmascota: idPet,
          op: "getVacunaMascota",
          idpaciente: undefined,
        };
      case "addVacunaPaciente":
        return {
          ...obj,
          idmascota: idPet,
          op: "addVacunaMascota",
          idpaciente: undefined,
        };
      case "actualizarVacunaPaciente":
        return {
          ...obj,
          idmascota: idPet,
          op: "actualizarVacunaMascota",
          idpaciente: undefined,
        };
      case "deleteVacunaPaciente":
        return { ...obj, op: "deleteVacunaMascota", idusuario: undefined };
      case "eliminarCartillaVacuna":
        return { ...obj, idusuario: undefined };
      case "addCartillaVacuna":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
          idusuario: undefined,
        };
      default:
        return obj;
    }
  }
  //PERFIL
  protected modifyForOperationPerfil(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getPerfil":
        return { ...obj, id: idPet, parentesco: "Mascota" };
      case "getFichaCompleta":
        return { ...obj, id: idPet };
      case "getPerfilEdicion":
        return { ...obj, id: idPet };
      case "upLoadFile":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
          idusuario: undefined,
          correo: undefined,
        };
      case "getTipoPerfil":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deletePaciente":
        return {
          ...obj,
          op: "deleteMascota",
          id: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      // Add more cases as needed
      default:
        return obj;
    }
  }
  //LABORATORIOS
  protected modifyForOperationLaboratorios(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getLaboratoriosListado":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "getUltimoLaboratorio":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "getLaboratorios":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "getComboExamenes":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "valoresLaboratorio":
        return { ...obj, idmascota: idPet };
      case "addLaboratorio":
        return {
          ...obj,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "laboratorioEditar":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editLaboratorio":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
        };
      case "laboratorioEliminarArchivo":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "upLoadFileLaboratorio":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "deletLaboratorio":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }
  //IMAGENOLOGIAS
  protected modifyForOperationImagenologias(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getImagenologias":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "getUltimaImagenologia":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "getImagenologia":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "cargarImagenes":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "addImagenologia":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "imagenologiaEditar":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editImagenologia":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "imagenologiaEliminarArchivo":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "upLoadFileImagenologia":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "deletImagenologia":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }
  //CITAS
  protected modifyForOperationCitas(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getCitas":
        return { ...obj, idpaciente: undefined, idmascota: idPet };
      case "getCitaDetalle":
        return { ...obj, idmascota: idPet, op: "citaDetalle" };
      case "addCitaInterna":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "editCitaInterna":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addNote":
        return { ...obj, idusuario: undefined };
      case "deleteNote":
        return { ...obj };
      case "citaDelete":
        return { ...obj, idmascota: idPet };
      default:
        return obj;
    }
  }
  //RECETAS
  protected modifyForOperationRecetas(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getReceta":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "getRecetasFiles":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "addReceta":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "editReceta":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deletRecetasFile":
        return { ...obj };
      case "deleteReceta":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      default:
        return obj;
    }
  }
  //ALERGIAS
  protected modifyForOperationAlergias(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getAlergias":
        return { ...obj, idmascota: idPet };
      case "addAlergias":
        return {
          ...obj,
          idusuario: undefined,
          idmascota: idPet,
        };
      case "toggleAlergias":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deletAlergias":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "noTengo":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      default:
        return obj;
    }
  }
  //VETERINARIOS
  protected modifyForOperationVeterinarios(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getMedicos":
        return {
          ...obj,
          idpaciente: undefined,
          op: "getVeterinarios",
          idmascota: idPet,
        };
      case "getMedico":
        return {
          ...obj,
          idpaciente: undefined,
          op: "getVeterinario",
          idmascota: idPet,
        };
      case "addMedico":
        return {
          ...obj,
          idpaciente: undefined,
          op: "addVeterinario",
          idmascota: idPet,
        };
      case "editMedico":
        return {
          ...obj,
          idmascota: idPet,
          idpaciente: undefined,
          op: "actualizarVeterinario",
        };
      case "deletMedico":
        return {
          ...obj,
          op: "deleteVeterinario",
          idmascota: idPet,
        };
      default:
        return obj;
    }
  }
  //ENFERMEDADES
  protected modifyForOperationEnfermedades(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "enfermedades":
        return {
          ...obj,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "add":
        return {
          ...obj,
          idpaciente: undefined,
          idmascota: idPet,
        };
      case "delete":
        return {
          ...obj,
          idmascota: idPet,
        };
      case "noTengo":
        return {
          ...obj,
          idusuario: undefined,
          idpaciente: undefined,
          idmascota: idPet,
        };
      default:
        return obj;
    }
  }
  //contactos
  protected modifyForOperationContctos(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getContactos":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addContacto":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editContacto":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }
  //Aseguradora
  protected modifyForOperationInsurance(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getAseguradora":
        return {
          ...obj,
          op: "aseguradoras",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addAseguradora":
        return {
          ...obj,
          op: "add",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deleteAseguradora":
        return {
          ...obj,
          op: "delete",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editAseguradora":
        return {
          ...obj,
          op: "edit",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deletAseguradoraFile":
        return {
          ...obj,
          op: "delete-file",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }
  //TRATAMIENTOS
  protected modifyForOperationTratamientos(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getTratamientos":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
          id: undefined,
        };
      case "tratamientosDelDia":
        console.log(
          "🚀 ~ file: modifyPetsRequest.ts ~ line 410 ~ ModifyPetsRequestService ~ modifyForOperationTratamientos ~ obj",
          obj
        );

        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "tratamientosCompletados":
        console.log(
          "🚀 ~ file: modifyPetsRequest.ts ~ line 410 ~ ModifyPetsRequestService ~ modifyForOperationTratamientos ~ obj",
          obj
        );
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getTratamiento":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editMedicamento":
        return {
          ...obj,
          op: "editTratamiento",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addMedicamento":
        return {
          ...obj,
          op: "addTratamiento",
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addTratamiento":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "editTratamiento":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deletTratamiento":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "posponerMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "registrarMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "saltarMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getTratamientosFiles":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getMediciones":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getMiMedicamentoDetail":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }
  // MEDICIONES
  protected modifyForOperationMediciones(
    obj: any,
    idPet: string,
    operation: string
  ): any {
    switch (operation) {
      case "getUltimasMediciones":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "addMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "deleteMedicion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "getMedicionRecordatorio":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "actualizarNotificacion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      case "agregarNotificacion":
        return {
          ...obj,
          idmascota: idPet,
          idusuario: undefined,
          idpaciente: undefined,
        };
      default:
        return obj;
    }
  }

  protected modifyDataAndParams(
    data: any,
    params: any,
    idPet: string,
    key: string,
    operation: string
  ): { modifiedData: any; modifiedParams: any } {
    let modifiedData = data;
    let modifiedParams = params;

    switch (key) {
      case "vacunas":
        if (data) {
          const obj = this.modifyForOperationVacunas(data, idPet, operation);
          // return obj instanceof FormData ? this.objectToFormData(obj) : obj;
          const modified =
            obj instanceof Object ? this.objectToFormData(obj) : obj;
          modifiedData = modified;
        }
        modifiedParams = this.modifyForOperationVacunas(
          params,
          idPet,
          operation
        );
        break;
      case "perfil":
        if (data) {
          const objPerfil = this.modifyForOperationPerfil(
            data,
            idPet,
            operation
          );
          const modifiedPerfil =
            objPerfil instanceof Object
              ? this.objectToFormData(objPerfil)
              : objPerfil;

          modifiedData = modifiedPerfil;
        }

        modifiedParams = this.modifyForOperationPerfil(
          params,
          idPet,
          operation
        );
        break;
      case "estudios":
        if (validOperations.laboratorios.includes(operation)) {
          if (data) {
            const objLaboratorios = this.modifyForOperationLaboratorios(
              data,
              idPet,
              operation
            );

            const modifiedLaboratorios =
              objLaboratorios instanceof Object
                ? this.objectToFormData(objLaboratorios)
                : objLaboratorios;

            modifiedData = modifiedLaboratorios;
          }

          modifiedParams = this.modifyForOperationLaboratorios(
            params,
            idPet,
            operation
          );
          break;
        }
        if (validOperations.imagenologias.includes(operation)) {
          if (data) {
            const objImagenologias = this.modifyForOperationImagenologias(
              data,
              idPet,
              operation
            );
            const modifiedImagenologias =
              objImagenologias instanceof Object
                ? this.objectToFormData(objImagenologias)
                : objImagenologias;

            modifiedData = modifiedImagenologias;
          }

          modifiedParams = this.modifyForOperationImagenologias(
            params,
            idPet,
            operation
          );
          break;
        }
        if (validOperations.citas.includes(operation)) {
          if (data) {
            const objCitas = this.modifyForOperationCitas(
              data,
              idPet,
              operation
            );
            const modifiedCitas =
              objCitas instanceof Object
                ? this.objectToFormData(objCitas)
                : objCitas;

            modifiedData = modifiedCitas;
          }

          modifiedParams = this.modifyForOperationCitas(
            params,
            idPet,
            operation
          );
          break;
        }

        break;
      case "recetas":
        if (data) {
          const objRecetas = this.modifyForOperationRecetas(
            data,
            idPet,
            operation
          );
          const modifiedRecetas =
            objRecetas instanceof Object
              ? this.objectToFormData(objRecetas)
              : objRecetas;

          modifiedData = modifiedRecetas;
        }

        modifiedParams = this.modifyForOperationRecetas(
          params,
          idPet,
          operation
        );
        break;
      case "pacientes":
        //  includes perfil
        if (validOperations.perfil.includes(operation)) {
          if (data) {
            const objPerfil = this.modifyForOperationPerfil(
              data,
              idPet,
              operation
            );
            const modifiedPerfil =
              objPerfil instanceof Object
                ? this.objectToFormData(objPerfil)
                : objPerfil;

            modifiedData = modifiedPerfil;
          }

          modifiedParams = this.modifyForOperationPerfil(
            params,
            idPet,
            operation
          );
          break;
        }
        //  includes tratamientos
        if (validOperations.tratamientos.includes(operation)) {
          if (data) {
            const objTratamientos = this.modifyForOperationTratamientos(
              data,
              idPet,
              operation
            );
            const modifiedTratamientos =
              objTratamientos instanceof Object
                ? this.objectToFormData(objTratamientos)
                : objTratamientos;

            modifiedData = modifiedTratamientos;
          }

          modifiedParams = this.modifyForOperationTratamientos(
            params,
            idPet,
            operation
          );
          break;
        }

        break;
      case "veterinarios":
        if (data) {
          const objVeterinarios = this.modifyForOperationVeterinarios(
            data,
            idPet,
            operation
          );
          const modifiedVeterinarios =
            objVeterinarios instanceof Object
              ? this.objectToFormData(objVeterinarios)
              : objVeterinarios;

          modifiedData = modifiedVeterinarios;
        }

        modifiedParams = this.modifyForOperationVeterinarios(
          params,
          idPet,
          operation
        );
        break;
      case "contactos":
        if (data) {
          const objContactos = this.modifyForOperationContctos(
            data,
            idPet,
            operation
          );
          const modifiedContactos =
            objContactos instanceof Object
              ? this.objectToFormData(objContactos)
              : objContactos;

          modifiedData = modifiedContactos;
        }

        modifiedParams = this.modifyForOperationContctos(
          params,
          idPet,
          operation
        );
        break;
      case "tratamientos":
        if (data) {
          const objTratamientos = this.modifyForOperationTratamientos(
            data,
            idPet,
            operation
          );
          const modifiedTratamientos =
            objTratamientos instanceof Object
              ? this.objectToFormData(objTratamientos)
              : objTratamientos;

          modifiedData = modifiedTratamientos;
        }
        modifiedParams = this.modifyForOperationTratamientos(
          params,
          idPet,
          operation
        );
        break;
      case "aseguradora":
        if (data) {
          const objInsurance = this.modifyForOperationInsurance(
            data,
            idPet,
            operation
          );
          const modifiedInsurance =
            objInsurance instanceof Object
              ? this.objectToFormData(objInsurance)
              : objInsurance;

          modifiedData = modifiedInsurance;
        }

        modifiedParams = this.modifyForOperationInsurance(
          params,
          idPet,
          operation
        );

        break;
      case "mediciones":
        if (data) {
          const objMediciones = this.modifyForOperationMediciones(
            data,
            idPet,
            operation
          );
          const modifiedMediciones =
            objMediciones instanceof Object
              ? this.objectToFormData(objMediciones)
              : objMediciones;

          modifiedData = modifiedMediciones;
        }
        modifiedParams = this.modifyForOperationMediciones(
          params,
          idPet,
          operation
        );
        break;
      case "alergias":
        if (data) {
          const objAlergias = this.modifyForOperationAlergias(
            data,
            idPet,
            operation
          );
          const modifiedAlergias =
            objAlergias instanceof Object
              ? this.objectToFormData(objAlergias)
              : objAlergias;

          modifiedData = modifiedAlergias;
        }
        modifiedParams = this.modifyForOperationAlergias(
          params,
          idPet,
          operation
        );
        break;
      case "enfermedades":
        if (data) {
          const objEnfermedades = this.modifyForOperationEnfermedades(
            data,
            idPet,
            operation
          );
          const modifiedEnfermedades =
            objEnfermedades instanceof Object
              ? this.objectToFormData(objEnfermedades)
              : objEnfermedades;

          modifiedData = modifiedEnfermedades;
        }
        modifiedParams = this.modifyForOperationEnfermedades(
          params,
          idPet,
          operation
        );
        break;

      // Add more cases here for other URLs

      default:
        break;
    }

    return { modifiedData, modifiedParams };
  }

  public modifyRequestPets(
    data: any,
    params: any,
    url: string,
    isPet: boolean,
    idPet: string
  ): { modifiedData: any; modifiedParams: any; modifiedUrl: string } {
    try {
      if (isPet) {
        const petUrl = this.listPetsUrlToModify.find((item) =>
          url.includes(item.url)
        );
        if (petUrl) {
          if (data instanceof FormData) {
            data = this.formDataToObject(data);
          }
          const operation = data?.op || params?.op;
          const modifiedUrl =
            petUrl.key === "perfil"
              ? url
              : this.modifyRequestURL(url, operation);

          // Transform FormData to Object

          const { modifiedData, modifiedParams } = this.modifyDataAndParams(
            data,
            params,
            idPet,
            petUrl.key,
            operation
          );

          return { modifiedData, modifiedParams, modifiedUrl };
        }
      }
      return { modifiedData: data, modifiedParams: params, modifiedUrl: url };
    } catch (error) {
      console.log("error", error);
      return { modifiedData: data, modifiedParams: params, modifiedUrl: url };
    }
  }
}

export class PetsRequestModifier extends ModifyPetsRequestService {
  public modifyRequestPets(
    data: any,
    params: any,
    url: string,
    isPet: boolean,
    idPet: string
  ): { modifiedData: any; modifiedParams: any; modifiedUrl: string } {
    try {
      return super.modifyRequestPets(data, params, url, isPet, idPet);
    } catch (error) {
      console.log("error", error);
      return { modifiedData: data, modifiedParams: params, modifiedUrl: url };
    }
  }
}
