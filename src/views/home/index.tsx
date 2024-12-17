import { Col, Row } from "antd";
import useHomeScreen from "./hooks/useHomeScreen";
import MeasurementList from "./components/MeasurementList";
import LastStudiesList from "./components/LastStudiesList";
import NextAppointmentsList from "./components/NextAppointmentsList";
import LastTreatments from "./components/LastTreatments";
import CalendarHome from "./components/CalendarHome";

function HomeView() {
  const { measurements } = useHomeScreen();
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={17}>
          <MeasurementList cards={measurements} />
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <LastStudiesList />
              <NextAppointmentsList />
            </Col>
            <Col span={12}>
              <LastTreatments />
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <CalendarHome />
        </Col>
      </Row>
    </>
  );
}

export default HomeView;
