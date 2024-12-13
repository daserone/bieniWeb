import { IAppointment } from "@/hooks/useAppointmentsQuery";
import { colors } from "@/theming/colors";
import {
  getDayMonthYear,
  getOnlyDay,
  getOnlyMonth,
  getOnlyYear,
} from "@/utils/dateHelpers";
import { Typography } from "antd";
import { CSSProperties } from "react";
import {
  InfoOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

interface NextAppointmentCardProps {
  appointment: IAppointment;
  isFirst: boolean;
}

function NextAppointmentCard({
  appointment,
  isFirst,
}: NextAppointmentCardProps) {
  const { Text } = Typography;

  const dateColumn = () => {
    return (
      <div style={styles.dateItemFirstColumn}>
        <Text style={styles.firstColumnTextMediumSize}>
          {getOnlyMonth(appointment.fechaCita)}
        </Text>
        <Text style={styles.firstColumnTextBig}>
          {getOnlyDay(appointment.fechaCita)}
        </Text>
        <Text style={styles.firstColumnText}>
          {getOnlyYear(appointment.fechaCita)}
        </Text>
      </div>
    );
  };

  const infoColumn = () => {
    return (
      <div style={{ ...styles.dateItemSecondColumn }}>
        <div style={styles.rowContainer}>
          <InfoOutlined color={colors.colorPrimaryDark} />
          <Text style={styles.secondColumnText}>{appointment.servicio}</Text>
        </div>
        <div>
          <div style={styles.rowContainer}>
            <ClockCircleOutlined color={colors.colorPrimaryDark} />
            <Text style={styles.secondColumnText}>{appointment.hora}</Text>
          </div>
        </div>
        <div style={styles.rowContainer}>
          <PushpinOutlined color={colors.colorPrimaryDark} />
          <Text style={styles.secondColumnText}>{appointment.afiliado}</Text>
        </div>
      </div>
    );
  };

  const dateOneRow = () => {
    return (
      <div style={styles.dateItemFirstColumn}>
        <Text style={styles.firstColumnTextMediumSize}>
          {getDayMonthYear(appointment.fechaCita)}
        </Text>
      </div>
    );
  };

  const infoOneRow = () => {
    return (
      <div style={styles.dateItemSecondColumn}>
        <div style={styles.rowContainer}>
          <InfoOutlined color={colors.colorPrimaryDark} />
          <Text style={styles.secondColumnText}>{appointment.servicio}</Text>
        </div>
      </div>
    );
  };

  const firstCard = () => {
    return (
      <div style={styles.container}>
        {dateColumn()}
        {infoColumn()}
      </div>
    );
  };

  const notFirstCard = () => {
    return (
      <div style={styles.container}>
        {dateOneRow()}
        {infoOneRow()}
      </div>
    );
  };

  const handleCard = () => {
    return isFirst ? firstCard() : notFirstCard();
  };

  return handleCard();
}

export default NextAppointmentCard;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    padding: 2,
    alignItems: "center",
    gap: 24,
    alignSelf: "stretch",
    borderRadius: 6,
    border: "1px solid #C3C1CA",
    background: "#FFF",
    color: colors.colorPrimaryDark,
    marginBottom: 10,
  },
  dateItemFirstColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
    width: "25%",
    padding: "0px 15px",
    borderRight: "1px solid #C3C1CA",
  },
  firstColumnTextMediumSize: {
    fontSize: 16,
    color: colors.colorPrimaryDark,
    fontWeight: 500,
  },
  firstColumnTextBig: {
    fontSize: 24,
    color: colors.colorPrimaryDark,
    fontWeight: 600,
  },
  firstColumnText: {
    fontSize: 16,
    color: colors.colorPrimaryDark,
    fontWeight: 500,
  },
  dateItemSecondColumn: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px 0px 0px",
    width: "75%",
  },
  secondColumnText: {
    fontSize: 16,
    color: colors.colorPrimaryDark,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
};
