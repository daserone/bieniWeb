import { FirebaseService } from "@providers/firebase/FirebaseService";
import service from "../services";
import { ICreatePatientRequest } from "@/models/auth";

export abstract class AuthService {
  //login
  static async login({
    email,
    password,
    isFromSocial,
    avatar,
  }: {
    email: string;
    password: string;
    isFromSocial: boolean;
    avatar?: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append(
        "op",
        isFromSocial ? "doLoginWithGoogle" : "dologinWithCredencial"
      );
      formData.append("correo", email);
      formData.append("codigo", "web");
      // formData.append('codigo', '2.1.0');
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      if (!isFromSocial) {
        formData.append("clave", password);
      } else {
        formData.append("imagen_perfil", avatar || "");
        formData.append("vc", "1");
      }

      const response = await service.post("controller/login.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  //pw recovery

  static async passwordRecovery({
    email,

    isVc,
  }: {
    email: string;

    isVc: boolean;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "reestablecerPassword");
      formData.append("correo", email);

      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      formData.append("vc", isVc ? "1" : "0");

      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  //register

  static async register({
    email,
    avatar,
    isFromSocial,
  }: {
    email: string;
    avatar?: string;
    isFromSocial: boolean;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "existeCuenta");
      formData.append("correo", email);
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      if (isFromSocial) {
        formData.append("imagen_perfil", avatar || "");
        formData.append("vc", "1");
      }

      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  //send email verification
  static async sendEmailVerification({
    email,
  }: {
    email: string;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "enviarLink");
      formData.append("correo", email);
      formData.append("version", "web");

      const response = await service.post("controller/email.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // check email verification
  static async checkEmailVerification({
    email,
    isVc,
  }: {
    email: string;
    isVc: boolean;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "verificarLink");
      formData.append("correo", email);
      formData.append("vc", isVc ? "1" : "0");

      const response = await service.post("controller/email.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // check service status
  static async checkServiceStatus({
    id,
    email,
    isVc,
  }: {
    id: string;
    email: string;
    isVc: boolean;
  }): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "consultarEstadoServicio");
      formData.append("idverificacion", id);
      formData.append("correo", email);
      formData.append("vc", isVc ? "1" : "0");

      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // register patient
  static async registerPatient(req: ICreatePatientRequest) {
    try {
      let formData = new FormData();
      formData.append("op", "registrarPaciente");
      formData.append("idusuario", req.userId);
      formData.append("nombre", req.firstName);
      formData.append("apellido", req.lastName);
      formData.append("fechanacimiento", req.dateOfBirth);
      formData.append("gruposangre", "");
      formData.append("edad", req.age);
      formData.append("tipodocumento", req.documentType);
      formData.append("documento", req.document);
      formData.append("firma", req.firm);
      formData.append("sexo", req.sex);
      formData.append("telefono", req.phone);
      formData.append("tipoverificacion", req.verificationType);
      formData.append("origen", "registro");
      formData.append("imagen_perfil", req.googleAvatar ?? "");
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      formData.append("dispositivo", "web");

      if (req.verificationType === "verificacion-manual") {
        formData.append(
          "imagen_verificacion_documento",
          new Blob([JSON.stringify(req.imgDocument)], {
            type: req.imgDocument.type,
          }),
          req.imgDocument.name
        );

        formData.append(
          "imagen_verificacion_perfil",
          new Blob([JSON.stringify(req.imgProfile)], {
            type: req.imgProfile.type,
          }),
          req.imgProfile.name
        );
      } else {
        formData.append("imagen_verificacion_documento", "");
        formData.append("imagen_verificacion_perfil", "");
      }

      const response = await service.post("controller/registro.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // register signature
  static async registerSignature({
    userId,
    patientId,
    firm,
    googleAvatar,
  }: {
    userId: string;
    patientId: string;
    firm: string;
    googleAvatar: string;
  }) {
    try {
      let formData = new FormData();
      formData.append("op", "registrarFirma");
      formData.append("idusuario", userId);
      formData.append("idpaciente", patientId);
      formData.append("firma", firm);
      formData.append("imagen_perfil", googleAvatar);
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      formData.append("dispositivo", "web");

      const response = await service.post("controller/registro.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // reject terms
  static async rejectTerms({ userId }: { userId: string }) {
    try {
      let formData = new FormData();
      formData.append("op", "rechazarTerminos");
      formData.append("idusuario", userId);

      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // changeManualAccount

  static async changeManualAccount({
    email,
    metamapID,
  }: {
    email: string;
    metamapID: string;
  }) {
    try {
      let formData = new FormData();
      formData.append("op", "cuentaManual");
      formData.append("correo", email);
      formData.append("idverificacion", metamapID);

      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // get accounts
  static async getAccounts({
    userId,
    email,
  }: {
    userId: string;
    email: string;
  }) {
    try {
      const response = await service.get("controller/login.php", {
        params: {
          op: "getCuentas",
          id: userId,
          correo: email,
          imestamp: new Date().getTime(),
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  // export const postDispositivos = (form: any) =>
  //   servicesWh.post("/controller/dispositivos.php", form, {
  //     responseType: "json",
  //   });

  static async postDevice({
    idUser,
    idPatient,
  }: {
    idUser: string;
    idPatient: string;
  }) {
    try {
      let formData = new FormData();
      formData.append("op", "registerdevice");
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      formData.append("idusuario", idUser);
      formData.append("idpaciente", idPatient);
      formData.append("nombre", "web");

      const response = await service.post(
        "controller/dispositivos.php",
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

  static async logout(email: string): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "cerrarSesion");
      formData.append("correo", email);
      const token = await FirebaseService.instance.getFCMToken();
      if (!token) {
        throw new Error("FCM token is undefined");
      }
      formData.append("token", token);
      const response = await service.post("controller/usuarios.php", formData, {
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  //controller.listaValidarCorreos.php
  //op = getListaValidarCorreos
  static async getValidEmails(): Promise<any> {
    try {
      let formData = new FormData();
      formData.append("op", "getListaValidarCorreos");
      const response = await service.get("controller/listaValidarCorreos.php", {
        params: {
          op: "getListaValidarCorreo",
        },
        responseType: "json",
      });
      return response.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
