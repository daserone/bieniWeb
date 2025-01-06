import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
// import useConfigStore from "./store/config";
import { Outlet, useNavigate } from "react-router-dom";
import { themeConfig } from "@theming/themeConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store, persistor } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
import { FirebaseService } from "./providers/firebase/FirebaseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

const App: React.FC = () => {
  // const theme = useConfigStore((state) => state.themeConfig);
  const navigate = useNavigate();

  //init firebase service
  // FirebaseService.instance;

  useEffect(() => {
    FirebaseService.instance;
    if (window.location.pathname === "/") {
      setTimeout(() => {
        navigate("/home");
      });
    }
    const apiURL = import.meta.env.VITE_BASE_URL;
    const apiMode = import.meta.env.MODE;
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
