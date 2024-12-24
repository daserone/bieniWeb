import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import MeasurementsContainer from "./components/MeasurementsContainer";

const MeasurementsView = () => {
  const { Title } = Typography;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Breadcrumb
          style={{ margin: "16px 20px" }}
          items={[{ title: "Mi salud" }, { title: "Mediciones" }]}
        />
      </div>
      <Title style={{ marginBottom: "1.2em", marginLeft: 20 }} level={4}>
        Mediciones
      </Title>
      <MeasurementsContainer />
    </>
  );
};

export default MeasurementsView;
