import React from "react";
import PageLayout from "./components/layout";
import { ConfigProvider } from "antd";
// import useConfigStore from "./store/config";
import { useNavigate } from "react-router-dom";
import { themeConfig } from "./theming/themeConfig";

const App: React.FC = () => {
  // const theme = useConfigStore((state) => state.themeConfig);
  const navigate = useNavigate();

  // TODO: refactor this logic
  if (window.location.pathname === "/") {
    setTimeout(() => {
      navigate("/demo/table");
    });
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <PageLayout />
    </ConfigProvider>
  );
};

export default App;
