import { Layout, Card, Button } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useLocation, useNavigate } from "react-router-dom";
import useOnboardingScreen from "./hooks/useOnboarding";
import { colors } from "@/theming/colors";
import { CSSProperties } from "react";
import HeaderAuth from "@/components/layout/headerAuth";
import AccountList from "./components/AccountList";

function OnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const { id, email } = location.state || { id: "", email: "" };

  const { accounts, handleSelectAccount } = useOnboardingScreen(id, email);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F6F5FF" }}>
      <HeaderAuth colorBgContainer="#F6F5FF" />

      <div style={styles.container}>
        <AccountList
          accounts={accounts}
          handleSelectAccount={handleSelectAccount}
        />
      </div>
    </Layout>
  );
}

export default OnboardingPage;

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "0 20px",
    height: "calc(100vh - 200px)",
    overflow: "auto",
    marginTop: "20px",
    backgroundColor: "#F6F5FF",
  },
};
