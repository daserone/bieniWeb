import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import MyHealthView from ".";
import { Outlet } from "react-router-dom";
import TreatmentsView from "./treatments";
import MeasurementsView from "./measurements";

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
            element: <TreatmentsView />,
            meta: {
              label: "Tratamientos",
              title: "Tratamientos",
              key: "/myHealth/treatments",
              icon: <ReactSVG src={IMAGES.ICONS_SVG.point_white_icon} />,
            },
          },
          {
            isAuth: true,
            path: "measurements",
            element: <MeasurementsView />,
            meta: {
              label: "Mediciones",
              title: "Mediciones",
              key: "/myHealth/measurements",
              icon: <ReactSVG src={IMAGES.ICONS_SVG.point_white_icon} />,
            },
          },
        ],
      },
    ],
  },
];

export default myHealthRoutes;
