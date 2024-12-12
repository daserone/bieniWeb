import { Col, Row, Typography } from "antd";
import useHomeScreen from "./hooks/useHomeScreen";
import MeasurementList from "./components/MeasurementList";
import LastStudiesList from "./components/LastStudiesList";

function HomeView() {
  const { measurements, isError, isLoading } = useHomeScreen();
  return (
    <>
      <Row>
        <Col span={18}>
          <MeasurementList cards={measurements} />
          <Row>
            <Col span={12}>
              <LastStudiesList />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Typography.Title level={1}>CALENDAR</Typography.Title>
        </Col>
      </Row>
    </>
  );
}

export default HomeView;
