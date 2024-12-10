import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import DirectoryView from ".";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "",
    order: 5,
    isAuth: true,
    element: <></>,
    meta: {
      label: "Perfil",
      title: "Perfil",
      key: "/profile",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.profile} />,
    },
    children: [
      {
        isAuth: true,
        path: "directory",
        element: <DirectoryView />,
        meta: {
          label: "Información",
          title: "Información",
          key: "/profile/information",
        },
      },
    ],
  },
];

export default directoryRoutes;
