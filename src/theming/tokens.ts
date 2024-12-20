import { AliasToken } from "antd/es/theme/internal";
import { colors } from "./colors";
const { colorPrimary, bgWhite } = colors;

export const token: Partial<AliasToken> = {
  colorPrimary: colorPrimary,
  colorBgBase: bgWhite,
  colorBgContainer: bgWhite,
  colorWhite: bgWhite,
  colorText: colorPrimary,
  colorTextSecondary: colors.colorSecondary,
  colorTextPlaceholder: colors.colorTertiary,
  fontFamily: "Montserrat, sans-serif",
};
