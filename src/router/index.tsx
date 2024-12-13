import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { MenuItemGroupType, MenuItemType } from "antd/es/menu/interface";
import LoginPage from "@/views/auth/login";
import RootRouter from "./RootRouter";
import OnboardingPage from "@/views/auth/onboarding";
import PublicRoute from "./PublicRoute";

export type AdminRouterItem = RouteObject & {
  // set antd menu props in meta
  meta?: MenuItemType | MenuItemGroupType;
  children?: AdminRouterItem[];
  isAuth?: boolean;
  order?: number;
  type?: string;
};

/**
 * auto load route from views/***\/*.router.ts
 * @returns route
 */
const loadRouteModules = async () => {
  const routeModuleFiles = import.meta.glob("../views/**/*.router.tsx", {
    eager: true,
    import: "default",
  });
  const routeModules: AdminRouterItem[] = [];

  for await (const [key, module] of Object.entries(routeModuleFiles)) {
    if (module) {
      const routes = Array.isArray(module) ? module : [module];
      routeModules.push(...routes);
    }
  }

  return routeModules;
};

/**
 *  filter by isAuth
 */

const authRoutes = [...(await loadRouteModules())].filter(
  (route) => route.isAuth
);
const noAuthRoutes = [...(await loadRouteModules())].filter(
  (route) => !route.isAuth
);

export const routes: AdminRouterItem[] = [...(await loadRouteModules())];
export const mapRoutes = (routes: any[]): RouteObject[] => {
  return routes.map((route) => {
    const { path, element, children } = route;
    return {
      path,
      element,
      children: children ? mapRoutes(children) : undefined,
    };
  });
};

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RootRouter />,
        children: mapRoutes(authRoutes),
      },
      {
        element: <PublicRoute />,
        children: mapRoutes(noAuthRoutes),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
]);
