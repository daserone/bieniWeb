import dayjs from "dayjs";
import "dayjs/locale/es";
import utc from "dayjs/plugin/utc"; // ES 2015
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
export const todayDate = () => {
  //ex miércoles, 26 de julio
  dayjs.locale("es");
  return dayjs().format("dddd, D [de] MMMM");
};

export const todayDateShort = () => {
  // ex  Hoy, 26 de julio
  dayjs.locale("es");
  return dayjs().format("D [de] MMMM");
};

export const getOnlyDayOfWeek = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("ddd");

    return formatted;
  } catch (error) {
    return "error";
  }
};

export const getOnlyDay = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("D");

    return formatted;
  } catch (error) {
    return "error";
  }
};

export const getOnlyMonth = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("MMM");

    return formatted;
  } catch (error) {
    return "error";
  }
};

//get only year
export const getOnlyYear = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("YYYY");

    return formatted;
  } catch (error) {
    return "error";
  }
};

// day and month
export const getDayAndMonth = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("D MMM");
    return formatted;
  } catch (error) {}
};

//day month and year
export const getDayMonthYear = (fecha: string) => {
  try {
    let date = new Date(fecha);
    dayjs.locale("es");
    let formatted = dayjs(date).utc().format("D MMM YYYY");
    return formatted;
  } catch (error) {}
};

export const getWord = (date: string, index: number) => {
  //separe fecha into an array and return the first

  let array = date.split(index === 0 ? "," : " ");
  return array[index];
};

export const hourToPmAm = (hour: string) => {
  let dateString = `2023-12-12 ${hour}`; // Use hyphens instead of slashes
  // 2023-12-12 00:10

  let date = dayjs(dateString, "YYYY-MM-DD HH:mm");

  let formattedHour = date.format("hh:mm a");
  return formattedHour;
};

export const hourWithDateToPmAm = (dateString: string) => {
  let date = dayjs(dateString, "YYYY-MM-DD HH:mm");
  let formattedHour = date.format("hh:mm a");
  return formattedHour;
};

export const dateMeasurement = (date: string) => {
  // Jueves, 4 de agosto
  let dateObj = new Date(date);
  dayjs.locale("es");
  return dayjs(dateObj).format("dddd, D [de] MMMM");
};

export const fullDate = (date: string) => {
  // Jueves, 4 de agosto de 2024
  let dateObj = new Date(date);
  dayjs.locale("es");
  return dayjs(dateObj).utc().format("dddd, D [de] MMMM [de] YYYY");
};

export const mediumDate = (date: string) => {
  // 3 de mayo 2023
  let dateObj = new Date(date);
  dayjs.locale("es");
  return dayjs(dateObj).format("D [de] MMMM YYYY");
};

export const formatShortDate = (date: string) => {
  dayjs.locale("es");
  let d = dayjs(date).format("DD MMM");

  return d;
};

export const formatDateMeasurementHistory = (date: string) => {
  // 18 nov, 12:00 am
  let dateObj = new Date(date);
  dayjs.locale("es");
  return dayjs(dateObj).format("DD MMM, hh:mm a");
};

// ex 05-01-2023 20:00
export const formatDate = (date: string) => {
  let d = dayjs(date).format("DD-MM-YYYY HH:mm");

  return d;
};

//ex 20 octubre 2024
export const formatDateWithMonth = (date: string) => {
  let d = dayjs(date).format("DD MMMM YYYY");

  return d;
};

// 15 dic
export const formatDateShort = (date: string) => {
  dayjs.locale("es");
  let d = dayjs(date).format("DD MMM");

  return d;
};
