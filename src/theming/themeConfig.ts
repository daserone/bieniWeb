import { theme, ThemeConfig } from "antd";
import { token } from "./tokens";
import { components } from "./components";

export const themeConfig: ThemeConfig = {
  token,
  components,
  algorithm: theme.defaultAlgorithm,
};
