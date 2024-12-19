import { colors } from "@/theming/colors";
import images from "@/theming/images";
import { Typography, Table, Card, Row, Col } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

interface Tabs {
  text: string;
  active: boolean;
}

interface CardListLayoutProps {
  customTabs: Tabs[];
  data: {
    lists: any[];
    columns: any[];
  };
  CustomCard: React.FC<{ data: any }>;
}

const CardListLayout = ({
  customTabs,
  data,
  CustomCard,
}: CardListLayoutProps) => {
  const { Text, Title } = Typography;

  const [isTable, setIsTable] = useState(true);

  const [tabs, setTabs] = useState(customTabs);

  const [dataSource, setDataSource] = useState(data.lists[0]);
  const [columns, setColumns] = useState(data.columns[0]);

  const handleTabClick = (index: number) => {
    const newTabs = tabs.map((tab, i) => {
      if (i === index) {
        return { ...tab, active: true };
      }
      return { ...tab, active: false };
    });

    setTabs(newTabs);
    setDataSource(data.lists[index]);
    setColumns(data.columns[index]);
  };

  useEffect(() => {
    setDataSource(data.lists[0]);
    setColumns(data.columns[0]);
  }, [data]);

  return (
    <div
      style={{
        ...styles.container,
      }}
    >
      <div style={styles.header}>
        <div style={styles.tabs}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              style={tab.active ? styles.tabActive : styles.tabInactive}
              onClick={() => handleTabClick(index)}
            >
              <Text>{tab.text}</Text>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "1em",
            cursor: "pointer",
            paddingRight: 10,
          }}
          onClick={() => setIsTable(!isTable)}
        >
          {isTable ? (
            <ReactSVG src={images.ICONS_SVG.table_icon_selected} />
          ) : (
            <ReactSVG src={images.ICONS_SVG.table_icon} />
          )}
          {isTable ? (
            <ReactSVG src={images.ICONS_SVG.grid_icon} />
          ) : (
            <ReactSVG src={images.ICONS_SVG.grid_icon_selected} />
          )}
        </div>
      </div>
      {isTable ? (
        <Table dataSource={dataSource} columns={columns} />
      ) : (
        <Card
          style={{
            borderRadius: 16,
            border: "none",
          }}
        >
          <Row gutter={[16, 16]}>
            {/* Mediciones */}
            {dataSource.map((card) => (
              <Col key={card.key} span={8}>
                <CustomCard data={card} />
              </Col>
            ))}
          </Row>
        </Card>
      )}
    </div>
  );
};

export default CardListLayout;

const styles: { [key: string]: CSSProperties } = {
  container: {
    borderRadius: 16,
    border: "1px solid #C3C1CA",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #C3C1CA",

    height: 80,
  },
  tabs: {
    display: "flex",
  },
  tabInactive: {
    height: 80,
    borderBottom: `1px solid #C3C1CA`,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    padding: "0 1em",
    minWidth: 60,
  },
  tabActive: {
    height: 80,
    borderBottom: `2px solid ${colors.colorPrimary}`,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    padding: "0 1em",
    minWidth: 60,
  },
};
