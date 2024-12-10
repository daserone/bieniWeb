import { AuthService } from "@/services/models/auth.service";
import { IUserState } from "@/store/reducers/user.reducer";
import { fixNameAndLastName, profileImg } from "@/utils/helpers";
import useToast from "@hooks/useToast";
import useUser from "@hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useOnboardingScreen = (userId: any, email: string) => {
  const [selectedAccount, setSelectedAccount] = useState<any>({});
  const [accounts, setAccounts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { modifyUserAction, resetUserAction } = useUser();

  const handleSelectAccount = (account: any) => {
    setSelectedAccount(account);
    handleLoginWithAccount(account);
  };

  const handleLoginWithAccount = (account: any) => {
    let user: IUserState = {
      access_token: account.token,
      id_patient: account.tipocuenta !== "Mascota" ? account.idpaciente : "",
      id: account.id,
      avatar: profileImg(account.id, account.idpaciente, account.imagen),
      email: account.correo ?? "",
      full_name: `${account.nombre} ${account.apellido}`,
      name: account.nombre,
      last_name: account.apellido,
      phone: "",
      id_pet: account.tipocuenta === "Mascota" ? account.idpaciente : "",
      isPet: account.tipocuenta === "Mascota",
      parentesco: "",
      vinculado: account.tipocuenta === "Mascota" ? 2 : 0,
      id_paciente_principal: account.idpacienteprincipal ?? "",
      id_parentesco: "",
      id_principal: account.idusuarioprincipal ?? "",
      first_time: account.primeravez === "1",
    };

    modifyUserAction(user);
    navigate("/demo/table");
  };

  const { showToastError } = useToast();

  //   [{"apellido": "ramirez", "documento": "testpasaporte", "fechacreacion": "15-02-2024", "id": 1290, "idpaciente": 1387, "imagen": "1708014016797.jpeg", "nombre": "daniel", "primeravez": 2, "tipodocumento": 2, "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JpZW5pd2FsbGV0LmNvbSIsImF1ZCI6ImJpZW5pIiwiaWF0IjoxNzIzNjU0MzIzLCJleHAiOjE3MjM2NTc5MjMsInVzZXJJZCI6MTI5MCwiZGF0YSI6eyJpZCI6MTI5MCwiaWRwYWNpZW50ZSI6MTM4N319.41Ng4bCWLLG2bHmaaH1y0KeYzzxE8yaPMPCokqTihS0"}]

  const getAccounts = async () => {
    AuthService.getAccounts({ userId: userId, email: email })
      .then((res) => {
        let { data, disponible, rsp, verificacion } = res;

        if (disponible === "si") {
          if (data.length > 0) {
            data.forEach((element: any) => {
              let { name, apellido } = fixNameAndLastName(
                element.nombre,
                element.apellido
              );
              element.nombre = name;
              element.apellido = apellido;
            });
            setAccounts(data);
            setSelectedAccount(data[0]);
            if (verificacion === "no") {
              //logout
            }
          } else {
            //logout
          }
        } else {
          //logout
        }
      })
      .catch((err) => {
        console.log(err);
        showToastError("Error al obtener las cuentas");
      });
  };

  useEffect(() => {
    if (userId && email) {
      getAccounts();
    }
  }, [userId, email]);

  return {
    selectedAccount,
    handleSelectAccount,
    accounts,
  };
};

export default useOnboardingScreen;
