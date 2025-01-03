import DemoPage from "./index";
import { DesktopOutlined } from "@ant-design/icons";
import { AdminRouterItem } from "../../router";
import DemoChart from "./chart";
import DemoTable from "./table";
import { Outlet } from "react-router-dom";

const demoRoutes: AdminRouterItem[] = [
  {
    path: "demo",
    isAuth: true,
    element: <DemoPage />,
    meta: {
      label: "Demo",
      title: "Demo",
      key: "/demo",
      icon: <DesktopOutlined />,
    },
    children: [
      {
        isAuth: true,
        path: "chart",
        element: <DemoChart />,
        meta: {
          label: "chart",
          title: "chart",
          key: "/demo/chart",
          icon: <DesktopOutlined />,
        },
      },
      {
        isAuth: true,
        path: "table",
        element: <DemoTable />,
        meta: {
          label: "table",
          title: "table",
          key: "/demo/table",
          icon: <DesktopOutlined />,
        },
      },
      {
        isAuth: true,
        path: "nested",
        element: <Outlet />,
        meta: {
          label: "nested",
          title: "nested",
          key: "/demo/nested",
          icon: <DesktopOutlined />,
        },
        children: [
          {
            isAuth: true,
            path: "table",
            element: <DemoTable />,
            meta: {
              label: "table",
              title: "table",
              key: "/demo/nested/table",
              icon: <DesktopOutlined />,
            },
          },
        ],
      },
    ],
  },
];

export default demoRoutes;
