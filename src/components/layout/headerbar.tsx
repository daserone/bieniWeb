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

const { Header } = Layout;

const Headerbar = (props: { colorBgContainer: string }) => {
  // const setAlgorithm = useConfigStore((state) => state.setAlgorithm);
  // const setCompactAlgorithm = useConfigStore(
  //   (state) => state.setCompactAlgorithm
  // );

  const { user, resetUserAction } = useUser();

  const logout = () => {
    resetUserAction();
    FirebaseService.instance.signOut();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      // icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      // icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "3",
      // icon: <LogoutOutlined />,
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <Header
      title="BieniWeb"
      style={{ padding: 0, background: props.colorBgContainer }}
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
        <div className=""></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BellOutlined style={{ fontSize: 20 }} />
          {/* <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked onChange={(checked) => setAlgorithm(checked ? 'default' : 'dark')} />
          <Switch checkedChildren="Compact" unCheckedChildren="Loose" onChange={(checked) => setCompactAlgorithm(checked ? 'compact' : '')} /> */}
          <p style={{ marginRight: 10 }}>{user.full_name}</p>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <img
              src={
                user.avatar !== ""
                  ? user.avatar
                  : "https://avatars.githubusercontent.com/u/48818060?s=48&v=4"
              }
              alt="avatar"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default Headerbar;
