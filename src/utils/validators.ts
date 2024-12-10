export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  if (!email || email.length <= 0) return "El correo no puede estar vacío.";
  if (!re.test(email)) return "Correo invalido.";
  return "";
};
