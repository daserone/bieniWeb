import {
  cardsMeasurements,
  cardsMeasurementsPets,
  MeasurementDetails,
} from "@/models/measurements.model";
import { formatShortDate } from "./dateHelpers";

export const obtenerImc = (fields: any) => {
  let calculado: any = 0;
  let peso = fields?.peso ?? 0;
  let altura = fields?.altura ?? 0;
  if (peso > 0 && altura > 0) {
    let alturaEnMetros = parseInt(altura) / 100;
    //let pesoN = peso.toFixed(2) * 0.453592;
    let pesoN = peso * 0.453592;
    let imc = pesoN / (alturaEnMetros * alturaEnMetros);
    //calculado = parseInt(imc.toFixed(2));
    calculado = imc.toFixed(2);
    return parseFloat(calculado);
  } else {
    return 0;
  }
};

export const getUnitLabel = (id: number, isPet: boolean = false) => {
  let cards = isPet ? cardsMeasurementsPets : cardsMeasurements;
  let card = cards.find((c) => c.id == id);
  return card?.unit ?? "";
};

export const handleCardsMeasurements = (data: any[]) => {
  let cards = cardsMeasurements.map((card: any, index) => {
    let medicion = data?.find((m: any) => m.idtipomedicion == card.id);
    if (medicion) {
      if (medicion.idtipomedicion == 1) {
        //calculate imc
        let imc = obtenerImc(medicion);
        card.value = imc;
      } else if (medicion.idtipomedicion == 2) {
        //calculate presion
        let presion = `${medicion.sistolica}/${medicion.diastolica}`;
        card.value = presion;
      } else {
        card.value = medicion.valor;
      }
      card.fecha = formatShortDate(medicion.fecha_creacion);
      card.selected = index === 0;
    } else {
      card.selected = false;
      card.value = "";
    }
    return card;
  });
  return cards;
};

//handle pets measurements
export const handleCardsMeasurementsPets = (data: any[]) => {
  let cards = cardsMeasurementsPets.map((card: any, index) => {
    let medicion = data?.find((m: any) => m.idtipomedicion == card.id);
    if (medicion) {
      if (medicion.idtipomedicion == 2) {
        //calculate presion
        let presion = `${medicion.sistolica}/${medicion.diastolica}`;
        card.value = presion;
      } else {
        card.value = medicion.valor;
      }
      card.fecha = formatShortDate(medicion.fecha_creacion);
      card.selected = index === 0;
    } else {
      card.selected = false;
      card.value = "";
    }
    return card;
  });
  return cards;
};

export const getImcValue = (imcs: MeasurementDetails[], sexo: number) => {
  if (imcs.length > 0) {
    let imc = imcs[0].imc;

    if (!imc) return;
    getImcTextValue(imc, sexo);
  }
  return "";
};

export const getImcTextValue = (imc: number, sexo: number) => {
  if (sexo === 1) {
    if (imc < 20.0) {
      return "Bajo peso";
    } else if (imc >= 20.0 && imc <= 26.99) {
      return "Normal";
    } else if (imc >= 27.0 && imc <= 29.99) {
      return "Sobrepeso";
    } else if (imc >= 30.0) {
      return "Obesidad";
    }
  } else {
    if (imc < 20.0) {
      return "Bajo peso";
    } else if (imc >= 20.0 && imc <= 24.99) {
      return "Normal";
    } else if (imc >= 25.0 && imc <= 29.99) {
      return "Sobrepeso";
    } else if (imc >= 30.0) {
      return "Obesidad";
    }
  }
};

export const imcChange = (imcs: MeasurementDetails[]) => {
  //diference between last imc and second last
  if (imcs.length > 1) {
    // let imc = imcs[0].imc;
    // let imc2 = imcs[1].imc;
    let imc = imcs[0].imc;
    let imc2 = imcs[1].imc;
    if (!imc || !imc2) return "0";
    let dif = imc - imc2;
    if (dif > 0) {
      return `${dif.toFixed(2)}`;
    } else {
      return `${dif.toFixed(2)}`;
    }
  }
  return "0";
};
export const removeMinusSign = (imcs: MeasurementDetails[]) => {
  return imcChange(imcs).replace("-", "");
};

export const pressureChange = (values: MeasurementDetails[]) => {
  // if (presionList.length > 1) {
  //   let imc = presionList[0].sistolica / presionList[0].diastolica;
  //   let imc2 = presionList[1].sistolica / presionList[1].diastolica;
  //   let dif = imc - imc2;
  //   if (dif > 0) {
  //     return `${dif.toFixed(2)}`;
  //   } else {
  //     return `${dif.toFixed(2)}`;
  //   }
  // }
  // return "0";
  if (values.length > 1) {
    let value =
      parseFloat(values[0].sistolica) / parseFloat(values[0].diastolica);
    let value2 =
      parseFloat(values[1].sistolica) / parseFloat(values[1].diastolica);
    if (!value || !value2) return "0";
    let dif = value - value2;
    if (dif > 0) {
      return `${dif.toFixed(2)}`;
    } else {
      return `${dif.toFixed(2)}`;
    }
  }
  return "0";
};

export const removeMinusSignPressure = (values: MeasurementDetails[]) => {
  return pressureChange(values).replace("-", "");
};

export const changeValue = (values: MeasurementDetails[]) => {
  if (values.length > 1) {
    let value = parseFloat(values[0].valor);
    let value2 = parseFloat(values[1].valor);
    if (!value || !value2) return "0";
    let dif = value - value2;
    if (dif > 0) {
      return `${dif.toFixed(2)}`;
    } else {
      return `${dif.toFixed(2)}`;
    }
  }
  return "0";
};

export const removeMinusSignValue = (values: MeasurementDetails[]) => {
  return changeValue(values).replace("-", "");
};

export const prepareImcData = (data: MeasurementDetails[]) => {
  const imcData = data.map((d) => {
    return {
      date: d.fecha_creacion,
      value: d.imc,
    };
  });
  console.log("imcData", imcData);

  return imcData;
};

export const preparePresionData = (data: MeasurementDetails[]) => {
  const presionData = data.map((d) => {
    return {
      date: d.fecha_creacion,
      sistolica: d.sistolica,
      diastolica: d.diastolica,
    };
  });
  return presionData;
};

export const prepareDefaultData = (data: MeasurementDetails[]) => {
  const defaultData = data.map((d) => {
    return {
      date: d.fecha_creacion,
      value: d.valor,
    };
  });
  return defaultData;
};
