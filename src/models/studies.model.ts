export interface LastImage {
  estado: string;
  estudio: string;
  fecha: string;
  id: string;
  imagenes: number;
  logo: string;
  origen: string;
  sede: string;
  tipo: string;
  unidad: string;
  urlimagen: string;
  urlinforme: string;
  year: string;
  open: boolean;
}

export const INITIAL_IMAGE = {
  id: "",
  estado: "",
  estudio: "",
  fecha: "",
  imagenes: 0,
  logo: "",
  origen: "",
  sede: "",
  tipo: "",
  unidad: "",
  urlimagen: "",
  urlinforme: "",
  year: "",
  open: false,
};

// {"fecha": "26 Jun", "id": 13778, "logo": "css.png", "origen": "externo", "sede": "Complejo Hospitalario Dr. Arnulfo Arias Madrid", "servicio": "HEMATOLOGIA - SANGRE EDTA", "servicioGlobal": "MEDICINA GENERAL", "tipo": "laboratorio", "unidad": "Caja de Seguro Social (CSS)", "url": "https://pid.maxialatam.com:5050/api/prrdd/v0/exam_lab?cip=3-706-1858&rid=10552781", "year": 2024}

export interface LastLab {
  fecha: string;
  id: string;
  logo: string;
  origen: string;
  sede: string;
  servicio: string;
  servicioGlobal: string;
  tipo: string;
  unidad: string;
  url: string;
  year: string;
  open: boolean;
  examen: string | string[];
}

export const INITIAL_LAB = {
  fecha: "",
  id: "",
  logo: "",
  origen: "",
  sede: "",
  servicio: "",
  servicioGlobal: "",
  tipo: "",
  unidad: "",
  url: "",
  year: "",
  open: false,
};
