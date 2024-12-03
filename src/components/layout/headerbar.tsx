import { Layout } from "antd";
import { BellOutlined } from "@ant-design/icons";
const { Header } = Layout;

const Headerbar = (props: { colorBgContainer: string }) => {
  // const setAlgorithm = useConfigStore((state) => state.setAlgorithm);
  // const setCompactAlgorithm = useConfigStore(
  //   (state) => state.setCompactAlgorithm
  // );

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
          <p style={{ marginRight: 10 }}>Yujian Xue</p>
          <img
            src="https://avatars.githubusercontent.com/u/48818060?s=48&v=4"
            alt="avatar"
            style={{ width: 40, height: 40 }}
          />
        </div>
      </div>
    </Header>
  );
};

export default Headerbar;
