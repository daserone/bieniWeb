import useUser from "@/hooks/useUser";
import { Typography } from "antd";
import { colors } from "@/theming/colors";
import {
  useAllTreatments,
  useTodayTreatments,
} from "@/hooks/useTreatmentsQuery";
import dayjs from "dayjs";
import TreatmentCard from "./LastTreatmentCard";
import {
  addDatesToTreatments,
  filterActiveTreatments,
} from "@/utils/treatmentsHelpers";
import { useMemo } from "react";
function LastTreatments() {
  const { user } = useUser();
  const {
    data: treatments,
    isError,
    isLoading,
  } = useAllTreatments(user.id_patient, user.id_pet);

  const {
    data: treatmentsByDate,
    isError: isErrorByDate,
    isLoading: isLoadingByDate,
  } = useTodayTreatments(user.id_patient, dayjs().format("YYYY-MM-DD"));

  const { Title, Link } = Typography;

  const activeTreatments = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];
    if (!treatments) return [];
    // first add dates to treatments
    const treatmentsWithDates = addDatesToTreatments(treatments);
    // filter active treatments
    const activeTreatments = filterActiveTreatments(treatmentsWithDates);
    return activeTreatments;
  }, [treatments, isLoading, isError]);
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
          Tratamientos
        </Title>

        <Link underline strong style={{ color: colors.colorPrimary }}>
          Ver todos
        </Link>
      </div>

      {activeTreatments &&
        activeTreatments.map((treatment: any) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            handleDeleteTreatment={() => {}}
            handleGoEditTreatment={() => {}}
          />
        ))}
    </>
  );
}

export default LastTreatments;
