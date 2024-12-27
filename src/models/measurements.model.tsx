import images from "@/theming/images";
import { ReactSVG } from "react-svg";
const cardsMeasurements: MeasurementCard[] = [
  {
    id: 1,
    title: "IMC",
    Icon: <ReactSVG src={images.ICONS_SVG.imc_icon} />,
    selected: false,
    value: "34.13",
    unit: "",
    url: "/app/imc",
    fecha: "",
    formValue: "",
    reminder: false,
  },
  {
    id: 2,
    title: "Presión",
    Icon: <ReactSVG src={images.ICONS_SVG.pressure_icon} />,
    selected: false,
    value: "120/80",
    unit: "mmHg",
    url: "/app/presion",
    fecha: "",
    formValue: "",
    reminder: false,
  },
  {
    id: 3,
    title: "Temperatura",
    Icon: <ReactSVG src={images.ICONS_SVG.temperature_icon} />,
    selected: false,
    value: "37",
    unit: "°C",
    url: "/app/temperatura",
    fecha: "",
    formValue: "temperatura",
    reminder: false,
  },
  {
    id: 4,
    title: "Peso",
    Icon: <ReactSVG src={images.ICONS_SVG.weight_icon} />,
    selected: false,
    value: "120",
    unit: "lbs",
    url: "/app/peso",
    fecha: "",
    formValue: "peso",
    reminder: false,
  },
  {
    id: 5,
    title: "Glucosa",
    Icon: <ReactSVG src={images.ICONS_SVG.glucose_icon} />,
    selected: false,
    value: "126",
    unit: "mg/dL",
    url: "/app/glucosa",
    fecha: "",
    formValue: "glucosa",
    reminder: false,
  },
  {
    id: 6,
    title: "Frecuencia Respiratoria",
    Icon: <ReactSVG src={images.ICONS_SVG.respiratory_icon} />,
    selected: false,
    value: "30",
    unit: "rpm",
    url: "/app/frecuencia-respiratoria",
    fecha: "",
    formValue: "frecuencia_respiratoria",
    reminder: false,
  },
  {
    id: 7,
    title: "Frecuencia Cardíaca",
    Icon: <ReactSVG src={images.ICONS_SVG.cardiac_icon} />,
    selected: false,
    value: "60",
    unit: "lpm",
    url: "/app/frecuencia-cardiaca",
    fecha: "",
    formValue: "frecuencia_cardiaca",
    reminder: false,
  },
  {
    id: 8,
    title: "Saturación de Oxigeno",
    Icon: <ReactSVG src={images.ICONS_SVG.oxygen_icon} />,
    selected: false,
    value: "94",
    unit: "%",
    url: "/app/saturacion-oxigeno",
    fecha: "",
    formValue: "saturacion_oxigeno",
    reminder: false,
  },
];

const cardsMeasurementsPets: MeasurementCard[] = [
  {
    id: 2,
    title: "Presión",
    Icon: <ReactSVG src={images.ICONS_SVG.pressure_icon} />,
    selected: false,
    value: "120/80",
    unit: "mmHg",
    url: "/app/presion",
    fecha: "",
    formValue: "",
    reminder: false,
  },
  {
    id: 3,
    title: "Temperatura",
    Icon: <ReactSVG src={images.ICONS_SVG.temperature_icon} />,
    selected: false,
    value: "37",
    unit: "°C",
    url: "/app/temperatura",
    fecha: "",
    formValue: "temperatura",
    reminder: false,
  },
  {
    id: 4,
    title: "Peso",
    Icon: <ReactSVG src={images.ICONS_SVG.weight_icon} />,
    selected: false,
    value: "120",
    unit: "lbs",
    url: "/app/peso",
    fecha: "",
    formValue: "peso",
    reminder: false,
  },
  {
    id: 6,
    title: "Frecuencia Respiratoria",
    Icon: <ReactSVG src={images.ICONS_SVG.respiratory_icon} />,
    selected: false,
    value: "30",
    unit: "rpm",
    url: "/app/frecuencia-respiratoria",
    fecha: "",
    formValue: "frecuencia_respiratoria",
    reminder: false,
  },
  {
    id: 7,
    title: "Frecuencia Cardíaca",
    Icon: <ReactSVG src={images.ICONS_SVG.cardiac_icon} />,
    selected: false,
    value: "60",
    unit: "lpm",
    url: "/app/frecuencia-cardiaca",
    fecha: "",
    formValue: "frecuencia_cardiaca",
    reminder: false,
  },
  {
    id: 9,
    title: "Altura",
    Icon: <ReactSVG src={images.ICONS_SVG.weight_icon} />,
    selected: false,
    value: "34.13",
    unit: "cm",
    url: "/app/altura",
    fecha: "",
    formValue: "altura",
    reminder: false,
  },
];

interface MeasurementCard {
  id: number;
  title: string;
  Icon?: React.ReactElement;
  selected: boolean;
  value: string;
  unit: string;
  url: string;
  fecha: string;
  formValue: string;
  reminder?: boolean;
}
interface CadaUnidades {
  label: string;
  unidad: string;
  cantidad: string;
}

const frecuencias = ["Intervalos Específicos", "Días de la semana específicos"];
const frecuenciasMedicament = [
  "Intervalos Específicos",
  "Días de la semana específicos",
  "Según se necesite",
];

const cadaUnidades: CadaUnidades[] = [
  { label: "2 horas", unidad: "Horas", cantidad: "2" },
  { label: "4 horas", unidad: "Horas", cantidad: "4" },
  { label: "6 horas", unidad: "Horas", cantidad: "6" },
  { label: "8 horas", unidad: "Horas", cantidad: "8" },
  { label: "12 horas", unidad: "Horas", cantidad: "12" },
  { label: "24 horas", unidad: "Horas", cantidad: "24" },
  { label: "48 horas", unidad: "Horas", cantidad: "48" },
  { label: "72 horas", unidad: "Horas", cantidad: "72" },
  { label: "7 días", unidad: "Días", cantidad: "7" },
];

export interface MeasurementDetails {
  altura: number;
  diastolica: string;
  fecha_creacion: string;
  id: number;
  idtipomedicion: number;
  medicion: string;
  peso: number;
  sistema: string;
  sistolica: string;
  valor: string;
  imc?: number;
  unit?: string;
}

export {
  cardsMeasurements,
  cadaUnidades,
  frecuencias,
  frecuenciasMedicament,
  cardsMeasurementsPets,
};

export type { MeasurementCard, CadaUnidades };
