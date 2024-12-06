import { Layout, Card, Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";

function OnboardingPage() {
  const navigate = useNavigate();

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
          <h1>Welcome to the Onboarding Page</h1>
          <p>Click to go login</p>
          <Button type="primary" onClick={() => navigate("/login")}>
            Go Login
          </Button>
          <p>Click to go register</p>
          <Button type="primary" onClick={() => navigate("/register")}>
            Go Register
          </Button>
        </Card>
      </div>
      <Footer style={{ textAlign: "center" }}>BieniWeb</Footer>
    </Layout>
  );
}

export default OnboardingPage;
