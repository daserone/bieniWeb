import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
// import useConfigStore from "./store/config";
import { Outlet, useNavigate } from "react-router-dom";
import { themeConfig } from "./theming/themeConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
import { FirebaseService } from "./providers/firebase/FirebaseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  // const theme = useConfigStore((state) => state.themeConfig);
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  //init firebase service
  // FirebaseService.instance;

  useEffect(() => {
    FirebaseService.instance;
    if (window.location.pathname === "/") {
      setTimeout(() => {
        navigate("/demo/table");
      });
    }
    const apiURL = import.meta.env.VITE_BASE_URL;
    const apiMode = import.meta.env.MODE;

    console.log("API url:", apiURL);
    console.log("API mode:", apiMode);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider theme={themeConfig}>
            <Outlet />
            <ToastContainer />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
