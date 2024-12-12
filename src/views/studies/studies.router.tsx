import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import StudiesView from ".";
import { Outlet } from "react-router-dom";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "studies",
    order: 3,
    isAuth: true,
    element: <Outlet />,
    meta: {
      label: "Estudios",
      title: "Estudios",
      key: "/studies",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.studies} />,
    },
    children: [
      {
        isAuth: true,
        path: "imaging",
        element: <StudiesView />,
        meta: {
          label: "Imagenología",
          title: "Imagenología",
          key: "/studies/imaging",
        },
      },
    ],
  },
];

export default directoryRoutes;
