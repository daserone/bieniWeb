import { ThemeConfig } from "antd";
import { colors } from "@theming/colors";

const { colorPrimary, bgWhite, colorPrimaryDark } = colors;

export const components: ThemeConfig["components"] = {
  Layout: {
    siderBg: colorPrimary,
  },
  Menu: {
    itemColor: bgWhite,
    itemSelectedColor: bgWhite,
    itemHoverBg: colorPrimaryDark,
    itemSelectedBg: colorPrimaryDark,
    colorBgContainer: colorPrimary,
    itemBorderRadius: 20,
    colorIconHover: bgWhite,
    itemHoverColor: bgWhite,
    groupTitleColor: bgWhite,
    groupTitleFontSize: 12,
  },
};
