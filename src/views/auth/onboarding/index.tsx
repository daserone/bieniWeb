import { Layout, Card, Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import useOnboardingScreen from "./hooks/useOnboarding";

function OnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const { id, email } = location.state as any;

  const { accounts, handleSelectAccount } = useOnboardingScreen(id, email);

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
          <h1>Selecciona una cuenta</h1>
          {accounts.map((account: any, index: number) => (
            <Button key={index} onClick={() => handleSelectAccount(account)}>
              {account.nombre} {account.apellido}
            </Button>
          ))}
        </Card>
      </div>
      <Footer style={{ textAlign: "center" }}>BieniWeb</Footer>
    </Layout>
  );
}

export default OnboardingPage;
