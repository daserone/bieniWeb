import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import MyHealthView from ".";
import { Outlet } from "react-router-dom";

const myHealthRoutes: AdminRouterItem[] = [
  {
    order: 2,
    isAuth: true,
    element: <Outlet />,
    meta: {
      label: "Navegación",
      key: "",
      type: "group",
    },
    children: [
      {
        path: "myHealth",
        isAuth: true,
        element: <Outlet />,
        meta: {
          label: "Mi Salud",
          title: "Mi Salud",
          key: "/myHealth",
          icon: <ReactSVG src={IMAGES.ICONS_SVG.my_health} />,
        },
        children: [
          {
            isAuth: true,
            path: "treatments",
            element: <MyHealthView />,
            meta: {
              label: "Tratamientos",
              title: "Tratamientos",
              key: "/myHealth/treatments",
            },
          },
        ],
      },
    ],
  },
];

export default myHealthRoutes;
