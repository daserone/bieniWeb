import BieniButton from "@/components/bieni-button/BieniButton";
import { colors } from "@/theming/colors";
import { Form, Input } from "antd";
import { CSSProperties } from "react";

interface ModalPwRecoveryProps {
  handleCancel: () => void;
  handleRecovery: (email: string) => void;
}

function ModalPwRecovery({
  handleCancel,
  handleRecovery,
}: ModalPwRecoveryProps) {
  const [form] = Form.useForm();
  return (
    <div>
      <div style={styles.title}>Recuperar contraseña</div>
      <div style={styles.contentText}>
        Ingrese su correo electrónico y le enviaremos un enlace para recuperar
        su contraseña
      </div>
      <Form form={form} style={styles.form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su correo electrónico",
            },
            {
              type: "email",
              message: "Por favor ingrese un correo electrónico válido",
            },
          ]}
        >
          <Input placeholder="Correo electrónico" />
        </Form.Item>
        <div style={styles.buttonsRow}>
          <BieniButton
            text="Cancelar"
            onPress={() => {
              form.resetFields();
              handleCancel();
            }}
            color={colors.colorPrimary}
            textColor={colors.bgWhite}
            height={40}
            fontSize={14}
            isCompact
            outlined
          />
          <BieniButton
            text="Enviar nueva contraseña"
            onPress={() => {
              form
                .validateFields()
                .then((values) => {
                  handleRecovery(values.email);
                  form.resetFields();
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            color={colors.colorPrimary}
            height={40}
            fontSize={14}
            isCompact
          />
        </div>
      </Form>
    </div>
  );
}

export default ModalPwRecovery;

const styles: { [key: string]: CSSProperties } = {
  title: {
    color: colors.colorPrimary,
    marginBottom: 20,
    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    fontSize: 20,
  },
  contentText: {
    color: colors.colorPrimary,
    textAlign: "center" as "center",
    fontSize: 16,
  },
  buttonsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 20,
  },
};
