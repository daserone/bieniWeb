import { Breadcrumb } from "antd";
import MeasurementsContainer from "./components/MeasurementsContainer";

const MeasurementsView = () => {
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

      <MeasurementsContainer />
    </>
  );
};

export default MeasurementsView;
