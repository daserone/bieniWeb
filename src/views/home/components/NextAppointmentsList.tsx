import useUser from "@hooks/useUser";
import { useLastAppointments } from "@hooks/useAppointmentsQuery";
import { CSSProperties } from "react";
import { Typography } from "antd";
import NextAppointmentCard from "./NextAppointmentCard";
import { colors } from "@/theming/colors";

const NextAppointmentsList = () => {
  const { user } = useUser();
  const {
    data: appointments,
    isError,
    isLoading,
  } = useLastAppointments(user.id_patient, user.id_pet);

  const { Title, Link } = Typography;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title style={{ marginBottom: "1.2em" }} level={4}>
          Próximas citas
        </Title>

        <Link underline strong style={{ color: colors.colorPrimary }}>
          Ver todos
        </Link>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {appointments && appointments.length === 0 && (
        <div>No hay citas próximas</div>
      )}
      {appointments &&
        appointments.map((appointment, index) => (
          <NextAppointmentCard
            key={appointment.id}
            appointment={appointment}
            isFirst={index === 0}
          />
        ))}
    </>
  );
};

export default NextAppointmentsList;

const styles: { [key: string]: CSSProperties } = {};
