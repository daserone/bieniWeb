import useUser from "@/hooks/useUser";
import { IUserState } from "@/store/reducers/user.reducer";
import { Layout, Card, Button, Form, Tag, Checkbox, Input } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { FirebaseService } from "@/providers/firebase/FirebaseService";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function LoginPage() {
  const { modifyUserAction } = useUser();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const googleSignIn = async () => {
    let resp = await FirebaseService.instance.googleSignIn();
    console.log(resp);
  };

  // const handleLogin = () => {
  //   let user: IUserState = {
  //     access_token: "token-123",
  //     id_patient: "1",
  //     id: "1",
  //     avatar: "",
  //     email: "test@mail.co,",
  //     full_name: `pedro perez`,
  //     name: "pedro",
  //     last_name: "perez",
  //     phone: "",
  //     id_pet: "",
  //     isPet: false,
  //     parentesco: "",
  //     vinculado: 0,
  //     id_paciente_principal: "",
  //     id_parentesco: "",
  //     id_principal: "",
  //     first_time: false,
  //   };

  //   modifyUserAction(user);
  // };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          padding: "0 20px",
          height: "calc(100vh - 200px)",
          overflow: "auto",
          marginTop: "20px",
        }}
      >
        <Card
          style={{
            height: "100%",
            overflow: "auto",
            width: "50%",
            margin: "auto",
          }}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* google sign in  */}
          <Button type="primary" onClick={googleSignIn}>
            Sign in with Google
          </Button>
        </Card>
      </div>
      <Footer style={{ textAlign: "center" }}>BieniWeb</Footer>
    </Layout>
  );
}

export default LoginPage;
