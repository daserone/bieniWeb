import { Card, Col, Row, Typography } from "antd";
import MeasurementCard from "./MeasurementCard";

export interface IMeasurementCard {
  id: number;
  title: string;
  Icon: any;
  selected: boolean;
  value: string;
  unit: string;
  url: string;
  fecha: string;
  formValue: string;
  reminder: boolean;
}

interface MeasurementListProps {
  cards: IMeasurementCard[];
}

function MeasurementList({ cards }: MeasurementListProps) {
  const { Title } = Typography;

  return (
    // space 4 cards
    <>
      <Title level={4}>Mediciones</Title>

      <Row gutter={[16, 16]}>
        {/* Mediciones */}
        {cards.map((card) => (
          <Col key={card.id} span={6}>
            <MeasurementCard measurement={card} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default MeasurementList;
