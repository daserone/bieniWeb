import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import DirectoryView from ".";
import { Outlet } from "react-router-dom";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "directory",
    order: 4,
    isAuth: true,
    element: <Outlet />,
    meta: {
      label: "Directorio",
      title: "Directorio",
      key: "/directory",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.directory} />,
    },
    children: [
      {
        isAuth: true,
        path: "affiliates",
        element: <DirectoryView />,
        meta: {
          label: "Afiliados",
          title: "Afiliados",
          key: "/directory/affiliates",
        },
      },
    ],
  },
];

export default directoryRoutes;
