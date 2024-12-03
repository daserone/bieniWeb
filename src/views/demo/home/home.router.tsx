import { FormOutlined } from "@ant-design/icons";
import { AdminRouterItem } from "../../../router";
import HomePage from ".";

const demoRoutes: AdminRouterItem[] = [
  {
    path: "home",
    element: <HomePage />,
    meta: {
      label: "home",
      title: "home",
      key: "/home",
      icon: <FormOutlined />,
    },
  },
];

export default demoRoutes;
