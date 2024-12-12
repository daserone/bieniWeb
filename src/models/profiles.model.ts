// {"apellido": "Ramirez", "codigo_invitacion": "483F-83B9", "correo": "josedramirez28@gmail.com", "discapacidad": "si", "documento": "testpasaporte", "edad": "24 año(s)", "fecha_vencimiento_documento": null, "fechanacimiento": "2000-02-15", "gruposangre": "", "idestadoverificacion": 1, "idparentesco": 0, "imagen": "", "imagen_documento_reverso": "undefined", "imagen_verificacion": "undefined", "imagendocumento": "undefined", "nombre": "Daniel", "numeroemergencia": "", "telefono": "", "tipodocumento": "Pasaporte", "verificacioncorreo": "si"}

export interface IProfileScreen {
  navOptions:
    | "info"
    | "aseguradoras"
    | "contactos-emergencia"
    | "discapacidad"
    | "vinculados"
    | "config";
}
export interface Profile {
  apellido: string;
  codigo_invitacion: string;
  correo: string;
  discapacidad: string;
  documento: string;
  edad: string;
  fecha_vencimiento_documento: any;
  fechanacimiento: string;
  gruposangre: string;
  idestadoverificacion: number;
  idparentesco: number;
  imagen: string;
  imagen_documento_reverso: string;
  imagen_verificacion: string;
  imagendocumento: string;
  nombre: string;
  numeroemergencia: string;
  telefono: string;
  tipodocumento: string;
  verificacioncorreo: string;
  id: number;
  idUsuario: number;
  sexo: number;
  raza: string;
  grupo: string;
  razareferencia?: string;
  gruporeferencia?: string;
}

// [{"apellido": "Ramirez", "correo": "josedramirez28@gmail.com", "documento": "testpasaporte", "estado": "Activo", "fecharevision": "2024-03-04 10:02:44", "fondo": "default", "horatranscurrida": "4464 ", "id": 1290, "idestado": 1, "idpaciente": 1387, "idpacienteprincipal": 0, "idusuarioprincipal": 0, "imagen": "", "nombre": "Daniel", "notificacion": 0, "parentesco": "Principal", "vinculado": 0}]

export interface Profiles {
  apellido: string;
  correo: string;
  documento: string;
  estado: string;
  fecharevision: string;
  fondo: string;
  horatranscurrida: string;
  id: number;
  idestado: number;
  idpaciente?: number;
  idpacienteprincipal: number;
  idusuarioprincipal: number;
  imagen: string;
  nombre: string;
  notificacion: number;
  parentesco: string;
  vinculado: number;
  idmascota?: number;
}

export const newDependent: Profiles = {
  nombre: "Agregar a mi círculo",
  apellido: "",
  correo: "",
  documento: "",
  estado: "",
  fecharevision: "",
  fondo: "",
  horatranscurrida: "",
  id: 0,
  idestado: 0,
  idpaciente: 0,
  idpacienteprincipal: 0,
  idusuarioprincipal: 0,
  imagen: "",
  notificacion: 0,
  parentesco: "",
  vinculado: 0,
};

interface ProfileOptions {
  label: string;
  value: IProfileScreen["navOptions"];
}

export const profileOptions: ProfileOptions[] = [
  {
    label: "Información",
    value: "info",
  },
  {
    label: "Aseguradoras",
    value: "aseguradoras",
  },
  {
    label: "Contactos de emergencia",
    value: "contactos-emergencia",
  },
  {
    label: "Discapacidad",
    value: "discapacidad",
  },
  {
    label: "Personas vinculadas a mi perfil",
    value: "vinculados",
  },
  {
    label: "Configuración",
    value: "config",
  },
];

export const profileOptionsLinked: ProfileOptions[] = [
  {
    label: "Información",
    value: "info",
  },
  {
    label: "Aseguradoras",
    value: "aseguradoras",
  },
  {
    label: "Contactos de emergencia",
    value: "contactos-emergencia",
  },
  {
    label: "Discapacidad",
    value: "discapacidad",
  },
  // {
  //   label: 'Personas vinculadas a mi perfil',
  //   value: 'vinculados',
  // },
  {
    label: "Configuración",
    value: "config",
  },
];

export const profileOptionsPet: ProfileOptions[] = [
  {
    label: "Información",
    value: "info",
  },
  {
    label: "Aseguradoras",
    value: "aseguradoras",
  },

  {
    label: "Contactos de emergencia",
    value: "contactos-emergencia",
  },
  {
    label: "Configuración",
    value: "config",
  },
];
