import { AdminRouterItem } from "@/router";
import OnboardingPage from ".";
import LoginPage from ".";

const demoRoutes: AdminRouterItem[] = [
  {
    path: "login",
    isAuth: false,
    element: <LoginPage />,
    meta: {
      label: "Login",
      title: "Login",
      key: "/login",
    },
  },
];

export default demoRoutes;
