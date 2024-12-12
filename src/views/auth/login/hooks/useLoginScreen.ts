import { FirebaseService } from "@/providers/firebase/FirebaseService";
import useUser from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Form, FormProps } from "antd";
import { AuthService } from "@/services/models/auth.service";
import useToast from "@/hooks/useToast";
import { emailValidator } from "@/utils/validators";
import { useState } from "react";

export type FieldType = {
  username?: string;
  password?: string;
};

const useLoginScreen = () => {
  const { modifyUserAction } = useUser();
  const { showToast, showToastError, showToastSuccess } = useToast();
  const navigate = useNavigate();
  const [openPwRecovery, setOpenPwRecovery] = useState(false);
  const [openPwChanged, setOpenPwChanged] = useState(false);

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    if (values.username === "" || values.password === "") {
      showToastError("Por favor, complete todos los campos");
      return;
    }

    if (!values.username) {
      showToastError("Por favor, ingrese un correo");
      return;
    }

    if (emailValidator(values.username) !== "") {
      showToastError(emailValidator(values.username));
      return;
    }

    let body = {
      email: values.username,
      password: values.password,
      isFromSocial: false,
    };

    _signIn(body);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const googleSignIn = async () => {
    try {
      let resp = await FirebaseService.instance.googleSignIn();
      if (resp.email === "") {
        return;
      }

      let body = {
        email: resp.email,
        password: "",
        isFromSocial: true,
        avatar: resp.avatar,
      };

      _signIn(body);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGoSelectAccount = (id: string, email: string) => {
    navigate("/onboarding", {
      state: { id, email },
    });
  };

  const _signIn = (body: any) => {
    AuthService.login(body)
      .then((response) => {
        const {
          rsp = 1,
          msg,
          data,
          idusuario,
          tiposRegistros,
          statusServicio,
          errores,
          tipo,
        } = response;
        //success
        if (rsp == "1") {
          handleGoSelectAccount(data.id, data.correo);
        }
        //error
        if (rsp == "2") {
          showToastError(msg);
        }
        //waiting for validation
        if (rsp == "3") {
          //   setModalRegisterState(true);
          //   setStateType('espera');
          showToastError("Esperando validación");
        }
        //email not verified
        if (rsp == "4") {
          //   handleGoVerifyEmail(body.email);
          showToastError("Email no verificado");
        }
        //continue with registration
        if (rsp == "5") {
          if (statusServicio && statusServicio === "reviewNeeded") {
            // setIsErrorMetamap(true);
            // setErrorTitle(msg ?? 'Error en el servicio');
            // setError(errores ?? 'Error en el servicio');
            // setUserID(data.idusuario.toString());
            // setEmail(body.email);
            // setErrorTipo(tipo);
            // handleGoCreatePatient();
            showToastError("Error cuenta no registrada");
          } else {
            //TODO: continue with registration with metamapdata
            // alertMetamap(
            //   data.idServicio,
            //   data.idusuario.toString(),
            //   body.email,
            // );
            showToastError("Error cuenta no registrada");
          }
        }
        //continue with registration with only userid and email
        if (rsp == "6") {
          //   setUser({
          //     email: body.email,
          //     userID: idusuario,
          //     userIDPatient: '',
          //     metamapID: '',
          //     googleAvatar: '',
          //     isVc: false,
          //   });
          //   handleGoCreatePatient();
          showToastError("Error cuenta no registrada");
        }
      })
      .catch((error) => {
        console.log("error", error);
        showToastError(error);
      });
  };

  const pwRecovery = (email: string) => {
    let emailVal = emailValidator(email);
    if (emailVal !== "") {
      showToastError(emailVal);
      return;
    }

    AuthService.passwordRecovery({
      email: email,
      isVc: false,
    })
      .then((response) => {
        const { rsp, msg, data } = response;
        //success
        if (rsp == "1") {
          setOpenPwRecovery(false);
          setOpenPwChanged(true);
        }
        //error
        if (rsp == "2") {
          setOpenPwRecovery(false);
          showToastError(msg);
        }
        // waiting for validation
        if (rsp == "3") {
          showToastError("Esperando validación");
          setOpenPwRecovery(false);
        }
        //email not verified
        if (rsp == "4") {
          showToastError("Email no verificado");
          setOpenPwRecovery(false);
        }
        //continue with registration
        if (rsp == "5") {
          showToastError("Error cuenta no registrada");
          setOpenPwRecovery(false);
        }
        //continue with registration with only userid and email
        if (rsp == "6") {
          showToastError("Error cuenta no registrada");
          setOpenPwRecovery(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return {
    form,
    onFinish,
    onFinishFailed,
    googleSignIn,
    pwRecovery,
    openPwRecovery,
    setOpenPwRecovery,
    openPwChanged,
    setOpenPwChanged,
  };
};

export default useLoginScreen;
