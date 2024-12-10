import { AdminRouterItem } from "../../router";
import HomeView from "./index";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";

const homeRoutes: AdminRouterItem[] = [
  {
    path: "home",
    order: 1,
    isAuth: true,
    element: <HomeView />,
    meta: {
      label: "Home",
      title: "Home",
      key: "/home",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.home} />,
    },
  },
];

export default homeRoutes;
