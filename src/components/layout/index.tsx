import React from "react";

import { Layout, theme, Typography } from "antd";
import PageSidebar from "./sidebar";
import PageContent from "./contentbar";
import PageBreadcrumb from "./breadcrumb";
import Headerbar from "./headerbar";
import { colors } from "@/theming/colors";

const { Footer } = Layout;

const PageLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Text, Link } = Typography;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <PageSidebar />
      <Layout>
        <Headerbar colorBgContainer={colorBgContainer} />
        <PageBreadcrumb />
        <PageContent></PageContent>
        <Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.colorTertiary }}>
            © 2023, creado por Bieni
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Link
              style={{
                color: colors.colorTertiary,
              }}
            >
              Licencia
            </Link>
            <Link
              style={{
                color: colors.colorTertiary,
              }}
            >
              Documentación
            </Link>
            <Link
              style={{
                color: colors.colorTertiary,
              }}
            >
              Soporte
            </Link>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
