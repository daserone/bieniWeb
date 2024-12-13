import { useLastImage, useLastLab } from "@/hooks/useStudiesQuery";
import useUser from "@/hooks/useUser";
import HomeStudiesItem from "./LastStudyCard";
import { Typography } from "antd";

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
  const { Title } = Typography;
  return (
    <>
      <Title level={4}>Últimos estudios</Title>

      {lastImage && <HomeStudiesItem type={"image"} lastImage={lastImage} />}
      {lastLab && <HomeStudiesItem type={"lab"} lastLab={lastLab} />}
    </>
  );
}

export default LastStudiesList;
