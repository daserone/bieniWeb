import { Layout, Card, Button, Form, Input } from "antd";
import { Footer } from "antd/es/layout/layout";
import useLoginScreen, { FieldType } from "./hooks/useLoginScreen";

function LoginPage() {
  const { form, onFinish, onFinishFailed, googleSignIn } = useLoginScreen();

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
