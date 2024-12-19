import { colors } from "@/theming/colors";
import { handleBgColor } from "@/utils/treatmentsHelpers";
import { Typography } from "antd";
import { CSSProperties } from "react";

const CustomCard: React.FC<{ data: any }> = ({ data }) => (
  <div style={styles.card}>
    <div
      style={{
        backgroundColor: handleBgColor(data.id_type_treatment, true),
        padding: 5,
        borderRadius: 5,
        height: 30,
        //adjust width to fit the text
        width: `${data.treatment_type.length * 10}px`,
        marginBottom: 10,
      }}
    >
      <Typography.Text style={{ color: "white", fontWeight: "bold" }}>
        {data.treatment_type}
      </Typography.Text>
    </div>
    <Typography.Text
      style={{
        color: colors.colorPrimary,
        fontSize: 14,
        fontWeight: "bold",
      }}
    >
      {data.treatment}
    </Typography.Text>
    <Typography.Text>
      {data.frequency} - Por {data.duration}{" "}
    </Typography.Text>
    <div
      style={{
        borderTop: `1px solid ${handleBgColor(data.id_type_treatment, true)}`,
        marginTop: 10,
        paddingTop: 10,
      }}
    >
      <Typography.Text>{data.motive}</Typography.Text>
    </div>
  </div>
);

export default CustomCard;

const styles: { [key: string]: CSSProperties } = {
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 10,
    border: "1px solid #C3C1CA",
    color: colors.colorPrimary,
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  firstRow: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  colorLine: {
    display: "flex",
    height: 60,
    borderRadius: 30,
    minWidth: 5,
    maxWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  contentColumn: {
    display: "flex",
    marginLeft: 10,
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: 10,
  },
  treatmentName: {
    fontSize: 14,
    color: colors.colorPrimary,
    fontWeight: "bold",
  },
  text: {
    color: colors.colorPrimary,
  },
};
