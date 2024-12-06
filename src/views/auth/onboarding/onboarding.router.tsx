import { AdminRouterItem } from "@/router";
import OnboardingPage from ".";

const demoRoutes: AdminRouterItem[] = [
  {
    path: "onboarding",
    isAuth: false,
    element: <OnboardingPage />,
    meta: {
      label: "Onboarding",
      title: "Onboarding",
      key: "/onboarding",
    },
  },
];

export default demoRoutes;
