import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import ProfileView from ".";
import { Outlet } from "react-router-dom";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "profile",
    order: 5,
    isAuth: true,
    element: <Outlet />,
    meta: {
      label: "Perfil",
      title: "Perfil",
      key: "/profile",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.profile} />,
    },
    children: [
      {
        isAuth: true,
        path: "information",
        element: <ProfileView />,
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
