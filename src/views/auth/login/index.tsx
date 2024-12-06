import useUser from "@/hooks/useUser";
import { IUserState } from "@/store/reducers/user.reducer";
import React from "react";

function LoginPage() {
  const { modifyUserAction } = useUser();

  const handleLogin = () => {
    let user: IUserState = {
      access_token: "token-123",
      id_patient: "1",
      id: "1",
      avatar: "",
      email: "test@mail.co,",
      full_name: `pedro perez`,
      name: "pedro",
      last_name: "perez",
      phone: "",
      id_pet: "",
      isPet: false,
      parentesco: "",
      vinculado: 0,
      id_paciente_principal: "",
      id_parentesco: "",
      id_principal: "",
      first_time: false,
    };

    modifyUserAction(user);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
