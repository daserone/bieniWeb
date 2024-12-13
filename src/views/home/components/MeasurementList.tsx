import { Card, Col, Row, Typography } from "antd";
import MeasurementCard from "./MeasurementCard";
import { colors } from "@/theming/colors";

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
  const { Title, Text, Link } = Typography;

  return (
    // space 4 cards
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title style={{ marginBottom: "1.2em" }} level={4}>
          Mediciones
        </Title>

        <Link underline strong style={{ color: colors.colorPrimary }}>
          Ver todas
        </Link>
      </div>

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
