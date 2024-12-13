import { Typography } from "antd";
import { CSSProperties } from "react";
import { colors } from "@/theming/colors";
import { LastImage, LastLab } from "@/models/studies.model";
import { ReactSVG } from "react-svg";
import images from "@/theming/images";
import { ConfigService } from "@/providers/config/ConfigService";
import { RightOutlined } from "@ant-design/icons";

interface ImageProps {
  type: "image";
  lastImage: LastImage;
}

interface LabProps {
  type: "lab";
  lastLab: LastLab;
}
type HomeStudiesItemProps = ImageProps | LabProps;
const HomeStudiesItem: React.FC<HomeStudiesItemProps> = (props) => {
  const { type } = props;
  const { Text } = Typography;

  const handleTitle = () => {
    switch (type) {
      case "image":
        return (
          <div style={styles.headerTitle}>
            <ReactSVG src={images.ICONS_SVG.image_icon} />
            <Text style={styles.titleCard}>{props.lastImage.estudio}</Text>
          </div>
        );
      case "lab":
        return (
          <div style={styles.headerTitle}>
            <ReactSVG src={images.ICONS_SVG.lab_icon} />
            <Text style={styles.titleCard}>{props.lastLab.servicioGlobal}</Text>
          </div>
        );
      default:
        return "";
    }
  };

  const getLogoWithBaseUrl = (logo: string) => {
    return `${ConfigService.instance.apiURL}asset/${logo}`;
  };

  return (
    <div style={styles.studiesItem}>
      <div style={styles.headerItem}>
        {handleTitle()}
        <RightOutlined color="red" />
      </div>
      <div style={styles.studiesContent}>
        <div style={styles.sedeRow}>
          <div style={styles.iconSede}>
            <img
              src={getLogoWithBaseUrl(
                type === "image" ? props.lastImage.logo : props.lastLab.logo
              )}
              width={40}
              height={40}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                border: "1px solid #C3C1CA",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={styles.titleSede}>
            <Text style={styles.subTitle}>
              {type === "image" ? props.lastImage.unidad : props.lastLab.unidad}
            </Text>
            <Text style={styles.description}>
              {type === "image" ? props.lastImage.sede : props.lastLab.sede}
            </Text>
          </div>
        </div>
        <div style={styles.dateRow}>
          {/* {item.fecha} {item.year} */}
          <Text style={styles.date}>
            {type === "image" ? props.lastImage.fecha : props.lastLab.fecha}{" "}
            {type === "image" ? props.lastImage.year : props.lastLab.year}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default HomeStudiesItem;

const styles: { [key: string]: CSSProperties } = {
  studiesItem: {
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: colors.bgWhite,
    display: "flex",
    flexDirection: "column",
    padding: 5,
    //     border-radius: 8px;
    // border: 1px solid var(--Neutral-300, #C3C1CA);
    // background: var(--Blanco, #FFF);
    border: "1px solid #C3C1CA",
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.bgWhite,
    padding: 10,
    gap: 10,
    width: "100%",
    color: colors.colorPrimaryDark,
    borderBottom: `1px solid #978af663`,
  },
  headerTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "left",
    color: colors.colorPrimaryDark,
    overflow: "hidden",
  },
  titleCard: {
    fontSize: 14,
    textAlign: "left",
    color: colors.colorPrimaryDark,
    overflow: "hidden",
    fontWeight: 700,
  },
  underline: {
    fontSize: 12,
    color: colors.colorPrimaryDark,
    textDecorationLine: "underline",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  subTitle: {
    fontSize: 14,
    textAlign: "left",
    color: colors.colorPrimaryDark,
    fontWeight: 600,
  },
  description: {
    fontSize: 12,
    color: colors.colorPrimaryDark,
    textAlign: "left",
  },
  date: {
    fontSize: 12,
    color: colors.colorSecondary,
    textAlign: "right",
    fontWeight: 500,
  },

  studiesContent: {
    gap: 10,
    marginTop: 10,
    padding: 10,
  },
  sedeRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  iconSede: {
    width: "15%",
  },
  titleSede: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "75%",
  },
  dateRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
};
