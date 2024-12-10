import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import DirectoryView from ".";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "",
    order: 4,
    isAuth: true,
    element: <></>,
    meta: {
      label: "Directorio",
      title: "Directorio",
      key: "/directory",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.directory} />,
    },
    children: [
      {
        isAuth: true,
        path: "directory",
        element: <DirectoryView />,
        meta: {
          label: "Afiliados",
          title: "Afiliados",
          key: "/directory/afiliados",
        },
      },
    ],
  },
];

export default directoryRoutes;
