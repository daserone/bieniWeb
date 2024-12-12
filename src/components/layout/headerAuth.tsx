import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useUser from "@/hooks/useUser";
import { FirebaseService } from "@/providers/firebase/FirebaseService";
import { Dropdown, Space, Layout } from "antd";
import type { MenuProps } from "antd";
import { ReactSVG } from "react-svg";
import images from "@/theming/images";

const { Header } = Layout;

const HeaderAuth = (props: { colorBgContainer: string }) => {
  return (
    <Header
      title="BieniWeb"
      style={{ padding: 0, background: "#F6F5FF", marginTop: 50 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        <div className="">
          <ReactSVG src={images.ICONS_SVG.logo_color} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}></div>
      </div>
    </Header>
  );
};

export default HeaderAuth;
