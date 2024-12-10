import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import MyHealthView from ".";

const myHealthRoutes: AdminRouterItem[] = [
  {
    path: "",
    order: 2,
    isAuth: true,
    element: <></>,
    meta: {
      label: "Navegación",
      key: "",
      type: "group",
    },
    children: [
      {
        isAuth: true,
        path: "myHealth",
        element: <MyHealthView />,
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
