import { ConfigService } from "@/providers/config/ConfigService";

export const profileImg = (
  userId: string,
  userIdPatient: string,
  image: string
) => {
  if (image === undefined) {
    return "";
  } else if (image === null) {
    return "";
  } else if (image === "") {
    return "";
  } else if (image === "undefined") {
    return "";
  } else {
    const foto = containsHttpOrHttps(image)
      ? image
      : isValidURL(image)
      ? `${ConfigService.instance.apiURL}asset/perfiles/${userId}/avatars/${userIdPatient}/perfil.png`
      : `${ConfigService.instance.apiURL}asset/perfiles/${userId}/avatars/${userIdPatient}/${image}`;
    return foto + "?time=" + new Date().getTime();
  }
};

function containsHttpOrHttps(cadena: any) {
  return cadena.includes("http") || cadena.includes("https");
}
function isValidURL(cadena: any) {
  var res = cadena.match(/(http(s)?:\/\/.)/g);
  return res !== null;
}

export const fixNameAndLastName = (name: string, apellido: string) => {
  let lowerCaseNombre = name.toLowerCase();
  let lowerCaseApellido = apellido.toLowerCase();
  const nombres = lowerCaseNombre.split(" ");
  const apellidos = lowerCaseApellido.split(" ");

  if (nombres.length > 0) {
    for (let i = 0; i < nombres.length; i++) {
      if (nombres[i] !== "") {
        nombres[i] = nombres[i][0].toUpperCase() + nombres[i].substr(1);
      }
    }
  }
  if (apellidos.length > 0) {
    for (let i = 0; i < apellidos.length; i++) {
      if (apellidos[i] !== "") {
        apellidos[i] = apellidos[i][0].toUpperCase() + apellidos[i].substr(1);
      }
    }
  }

  return { name: nombres.join(" "), apellido: apellidos.join(" ") };
};
