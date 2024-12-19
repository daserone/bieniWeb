import { Treatment } from "@/hooks/useTreatmentsQuery";
import dayjs from "dayjs";

const handleBgColor = (type: string, selected: boolean) => {
  switch (type) {
    //medicament
    case "1":
      return selected ? "#027961" : "#D7FEF6";
    // therapy
    case "2":
      return selected ? "#004E89" : "#D6EDFF";
    // diet
    case "5":
      return selected ? "#BA1B1D" : "#FADCDC";
    //other
    default:
      return selected ? "#8F3985" : "#F3E2F1";
  }
};

const handleTextColors = (type: string, selected: boolean) => {
  switch (type) {
    //medicament
    case "1":
      return selected ? "#fff" : "#027961";
    // therapy
    case "2":
      return selected ? "#fff" : "#004E89";
    // diet
    case "5":
      return selected ? "#fff" : "#BA1B1D";
    //other
    default:
      return selected ? "#fff" : "#8F3985";
  }
};

const handleName = (type: string) => {
  switch (type) {
    case "1":
      return "Medicamento";
    case "2":
      return "Terapia";
    case "5":
      return "Dieta";
    default:
      return "Otro";
  }
};

export const addDatesToTreatments = (treatments: Treatment[]) => {
  return treatments;
};

export const filterTodayTreatments = (treatments: any[]) => {
  return treatments.filter((trat: any) => trat.tratamiento_hoy === "1");
};

export const filterActiveTreatments = (treatments: any[]) => {
  return treatments.filter((item: any) => {
    if (item.prolongado === "1" || item.prolongado === "si") {
      return item;
    } else {
      //check if fechaFin is after or equal to today
      if (
        dayjs(item.fechafin).isAfter(dayjs(), "day") ||
        dayjs(item.fechafin).isSame(dayjs(), "day")
      ) {
        return item;
      }
    }
  });
};

export const filterInactiveTreatments = (treatments: any[]) => {
  return treatments.filter((trat: any) => {
    //check if fechaFin is before today
    if (dayjs(trat.fechafin).isBefore(dayjs(), "day")) {
      return trat;
    }
  });
};

export const getTreatmentName = (treatment: any) => {
  console.log("treatment", treatment);

  try {
    if (
      treatment.idtipotratamiento === "1" ||
      treatment.idtipotratamiento === 1
    ) {
      if (treatment.medicamento !== null && treatment.medicamento !== "NULL")
        return treatment.medicamento;
      else return "Nombre no encontrado";
    }
    if (
      treatment.idtipotratamiento !== "1" ||
      treatment.idtipotratamiento !== 1
    ) {
      if (treatment.nombreconsiste === "Otros") {
        if (
          treatment.consiste === null ||
          treatment.consiste === "NULL" ||
          treatment.consiste === ""
        )
          return treatment.nombreconsiste !== null &&
            treatment.nombreconsiste !== "NULL"
            ? treatment.nombreconsiste
            : "Nombre no encontrado";
        else return treatment.consiste;
      } else {
        if (
          treatment.consiste === null ||
          treatment.consiste === "NULL" ||
          treatment.consiste === ""
        )
          return treatment.nombreconsiste !== null &&
            treatment.nombreconsiste !== "NULL"
            ? treatment.nombreconsiste
            : "Nombre no encontrado";
        else return treatment.consiste;
      }
    }
  } catch (error) {
    console.log("error", error);

    return "Nombre no encontrado";
  }
};

export const parseAlarmDate = (alarm_date: string) => {
  if (!alarm_date) {
    return "";
  }
  if (alarm_date === "0000-00-00") {
    return "";
  }

  let fecha = dayjs(alarm_date).format("dddd, DD MMMM");

  return fecha;
};
export const parseAlarmHour = (date_alarm: string, hour_alarm: string) => {
  if (!hour_alarm || !date_alarm) {
    return "";
  }
  if (hour_alarm === "00:00:00" || hour_alarm === "00:00") {
    return "";
  }

  let hora = dayjs(date_alarm + " " + hour_alarm).format("hh:mm a");

  return hora;
};

export const addAccent = (text: string) => {
  if (text === "Sabado") {
    return "Sábado";
  } else if (text === "Miercoles") {
    return "Miércoles";
  }
  return text;
};

export { handleBgColor, handleTextColors, handleName };
