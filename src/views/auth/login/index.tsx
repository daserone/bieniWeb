import { Layout, Card, Button, Form, Input, Typography } from "antd";
import useLoginScreen, { FieldType } from "./hooks/useLoginScreen";
import HeaderAuth from "@/components/layout/headerAuth";
import { colors } from "@/theming/colors";
import BieniButton from "@/components/bieni-button/BieniButton";
import images from "@/theming/images";
import { ReactSVG } from "react-svg";

function LoginPage() {
  const {
    form,
    onFinish,
    onFinishFailed,
    googleSignIn,
    pwRecovery,
    openPwChanged,
    openPwRecovery,
    setOpenPwChanged,
    setOpenPwRecovery,
    appleSignIn,
  } = useLoginScreen();

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F6F5FF" }}>
      <HeaderAuth colorBgContainer="#F6F5FF" />
      <div style={styles.container}>
        <div style={styles.card}>
          <Typography.Title level={2}>Iniciar sesión</Typography.Title>
          <div style={styles.socialButtons}>
            {/* apple sign in  */}
            <BieniButton
              text="Inicia sesión con Apple ID"
              onPress={appleSignIn}
              color="#fff"
              textColor="#000"
              borderColor="#b5b5b5"
              icon={<ReactSVG src={images.ICONS_SVG.apple_icon} />}
            />

            {/* google sign in  */}
            <BieniButton
              text="Inicia sesión con Gmail"
              onPress={googleSignIn}
              color="#fff"
              textColor="#000"
              borderColor="#b5b5b5"
              icon={<img src={images.ICONS_SVG.google_icon} alt="google" />}
            />
          </div>
          {/* divider  */}
          <div style={styles.divider}>
            <div style={styles.dividerLine}></div>
            <div style={{ color: "#9A90C2", fontSize: 12 }}>o</div>
            <div style={styles.dividerLine}></div>
          </div>
          {/* form  */}
          <Form
            form={form}
            name="login"
            style={styles.form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Correo electrónico "
              name="username"
              rules={[
                { required: true, message: "Por favor ingrese su correo!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Contraseña"
              name="password"
              rules={[
                { required: true, message: "Por favor ingrese su contraseña!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <a
              style={styles.forgotPassword}
              onClick={() => setOpenPwRecovery(true)}
            >
              ¿Haz olvidado la contraseña?
            </a>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" style={styles.button}>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* modal pw recovery  */}
      <CustomModal
        isModalOpen={openPwRecovery}
        handleCancel={() => setOpenPwRecovery(false)}
        handleOk={() => setOpenPwRecovery(false)}
        children={
          <ModalPwRecovery
            handleCancel={() => setOpenPwRecovery(false)}
            handleRecovery={pwRecovery}
          />
        }
      />
      {/* modal pw changed  */}
      <CustomModal
        isModalOpen={openPwChanged}
        handleCancel={() => setOpenPwChanged(false)}
        handleOk={() => setOpenPwChanged(false)}
        children={
          <ModalSuccess
            title="¡Contraseña enviada!"
            contentText="Hemos enviado una nueva contraseña a tu correo electrónico. Usa esa contraseña para acceder a tu cuenta y recuerda cambiarla por una más segura en la configuración de tu perfil."
            handleClose={() => setOpenPwChanged(false)}
            closeText="Entendido"
          />
        }
      />
    </Layout>
  );
}

export default LoginPage;

import { CSSProperties } from "react";
import CustomModal from "@/components/custom-modal/CustomModal";
import ModalPwRecovery from "./components/ModalPwRecovery";
import ModalSuccess from "@/components/custom-modal/ModalSucces";

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "0 20px",
    height: "calc(100vh - 200px)",
    overflow: "auto",
    marginTop: "20px",
    backgroundColor: "#F6F5FF",
  },
  card: {
    height: "100%",
    overflow: "auto",
    minWidth: "400px",
    maxWidth: "calc(100vw - 700px)",
    margin: "auto",
    borderRadius: "30px",
    padding: "50px",
    backgroundColor: "#fff",
    flexDirection: "column",
    boxShadow: "2px 2px 10px 0px rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    marginBottom: 20,
    color: colors.colorPrimary,
    textAlign: "center" as "center",
  },
  form: {
    width: "100%",
  },
  button: {
    width: "100%",
    borderRadius: 50,
    height: 50,
    marginTop: 20,
  },
  googleButton: {
    width: "100%",
  },
  socialButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: "20px 0",
    color: "#9A90C2",
  },
  dividerLine: {
    backgroundColor: "#9A90C2",
    height: 1,
    width: "48%",
  },
  forgotPassword: {
    color: colors.colorPrimary,
    textAlign: "right" as "right",
    marginTop: 5,
    marginBottom: 20,
    textDecoration: "underline",
  },
};
