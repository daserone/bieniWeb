import { Col, Row, Typography } from "antd";
import useHomeScreen from "./hooks/useHomeScreen";
import MeasurementList from "./components/MeasurementList";
import LastStudiesList from "./components/LastStudiesList";
import NextAppointmentsList from "./components/NextAppointmentsList";

function HomeView() {
  const { measurements, isError, isLoading } = useHomeScreen();
  return (
    <>
      <Row>
        <Col span={17}>
          <MeasurementList cards={measurements} />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <LastStudiesList />
              <NextAppointmentsList />
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Typography.Title level={1}>CALENDAR</Typography.Title>
        </Col>
      </Row>
    </>
  );
}

export default HomeView;
