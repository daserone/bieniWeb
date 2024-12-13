import { useLastImage, useLastLab } from "@/hooks/useStudiesQuery";
import useUser from "@/hooks/useUser";
import HomeStudiesItem from "./LastStudyCard";
import { Typography } from "antd";
import { colors } from "@/theming/colors";

function LastStudiesList() {
  const { user } = useUser();
  const {
    data: lastLab,
    isError: isErrorLab,
    isLoading: isLoadingLab,
  } = useLastLab(user.id_patient, user.id_pet);

  const {
    data: lastImage,
    isError: isErrorImage,
    isLoading: isLoadingImage,
  } = useLastImage(user.id_patient, user.id, user.id_pet);
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
          Últimos estudios
        </Title>

        <Link underline strong style={{ color: colors.colorPrimary }}>
          Ver todos
        </Link>
      </div>

      {lastImage && <HomeStudiesItem type={"image"} lastImage={lastImage} />}
      {lastLab && <HomeStudiesItem type={"lab"} lastLab={lastLab} />}
    </>
  );
}

export default LastStudiesList;
