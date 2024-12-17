const path = require("path");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // change
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint", "import"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
      },
      typescript: {
        project: "./tsconfig.json",
      },
      alias: {
        map: [
          ["@", path.resolve(__dirname, "./src")],
          ["@assets", path.resolve(__dirname, "./src/assets")],
          ["@components", path.resolve(__dirname, "./src/components")],
          ["@hooks", path.resolve(__dirname, "./src/hooks")],
          ["@store", path.resolve(__dirname, "./src/store")],
          ["@theming", path.resolve(__dirname, "./src/theming")],
          ["@views", path.resolve(__dirname, "./src/views")],
          ["@router", path.resolve(__dirname, "./src/router")],
          ["@utils", path.resolve(__dirname, "./src/utils")],
          ["@providers", path.resolve(__dirname, "./src/providers")],
          ["@services", path.resolve(__dirname, "./src/services")],
          ["@models", path.resolve(__dirname, "./src/models")],
        ],
        extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
      },
    },
  },

  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
};
