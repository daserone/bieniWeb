import { AdminRouterItem } from "../../router";
import { ReactSVG } from "react-svg";
import IMAGES from "@theming/images";
import DirectoryView from ".";

const directoryRoutes: AdminRouterItem[] = [
  {
    path: "",
    order: 3,
    isAuth: true,
    element: <></>,
    meta: {
      label: "Estudios",
      title: "Estudios",
      key: "/studies",
      icon: <ReactSVG src={IMAGES.ICONS_SVG.studies} />,
    },
    children: [
      {
        isAuth: true,
        path: "studies",
        element: <DirectoryView />,
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
