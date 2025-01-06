import BieniButton from "@/components/bieni-button/BieniButton";
import { Form, FormProps, Input, Typography } from "antd";
import { i } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { CSSProperties } from "react";

interface FormIMC {
  talla: string;
  peso: string;
}

interface FormPressure {
  sistolica: string;
  diastolica: string;
}

interface FormValue {
  value: string;
}

export type MeasurementID = "imc" | "pressure" | "value";

export type MeasurementFormByID<T extends MeasurementID> = T extends "imc"
  ? FormIMC
  : T extends "pressure"
  ? FormPressure
  : T extends "value"
  ? FormValue
  : never;

interface ModalAddMeasurementProps<T extends MeasurementID> {
  idMeasurement: T;
  title: string;
  handleAdd: (data: MeasurementFormByID<T>) => void;
  unit: string;
  defaultValues?: MeasurementFormByID<T>;
}
const ModalAddMeasurement = <T extends MeasurementID>({
  idMeasurement,
  handleAdd,
  title,
  unit,
  defaultValues,
}: ModalAddMeasurementProps<T>) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<MeasurementFormByID<T>>["onFinish"] = (values) => {
    handleAdd(values);
  };

  const onFinishFailed: FormProps<MeasurementFormByID<T>>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const { Text, Title } = Typography;

  return (
    <div>
      <div style={styles.titleContainer}>
        <Title level={5} style={styles.title}>
          Registro de {title}
        </Title>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={defaultValues}
      >
        {idMeasurement === "imc" ? (
          <>
            <Form.Item
              label="Talla"
              name="talla"
              rules={[
                { required: true, message: "Por favor ingrese la talla" },
              ]}
            >
              <Input
                placeholder={`Ingrese la talla en cm`}
                type="number"
                suffix={"cm"}
              />
            </Form.Item>
            <Form.Item
              label="Peso"
              name="peso"
              rules={[{ required: true, message: "Por favor ingrese el peso" }]}
            >
              <Input
                placeholder={`Ingrese el peso en lbs`}
                type="number"
                suffix={"lbs"}
              />
            </Form.Item>
          </>
        ) : idMeasurement === "pressure" ? (
          <>
            <Form.Item
              label="Sistólica"
              name="sistolica"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la presión sistólica",
                },
              ]}
            >
              <Input
                placeholder={`Ingrese la presión sistólica`}
                type="number"
              />
            </Form.Item>
            <Form.Item
              label="Diastólica"
              name="diastolica"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la presión diastólica",
                },
              ]}
            >
              <Input
                placeholder={`Ingrese la presión diastólica`}
                type="number"
              />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            label="Valor"
            name="value"
            rules={[{ required: true, message: "Por favor ingrese el valor" }]}
          >
            <Input
              suffix={unit}
              placeholder={`Ingrese el valor en ${unit}`}
              type="number"
            />
          </Form.Item>
        )}
        <div style={styles.buttonTopContainer}>
          <div style={styles.buttonContainer}>
            <BieniButton
              text="Guardar medición"
              onPress={() => {
                form.submit();
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ModalAddMeasurement;

const styles: { [key: string]: CSSProperties } = {
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
  },
  buttonTopContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "60%",
  },
};
