import React from "react";
import PageLayout from "./components/layout";
import { ConfigProvider } from "antd";
// import useConfigStore from "./store/config";
import { Outlet, useNavigate } from "react-router-dom";
import { themeConfig } from "./theming/themeConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
import RootRouter from "./router/RootRouter";

const App: React.FC = () => {
  // const theme = useConfigStore((state) => state.themeConfig);
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  // TODO: refactor this logic
  if (window.location.pathname === "/") {
    setTimeout(() => {
      navigate("/demo/table");
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider theme={themeConfig}>
            <Outlet />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
