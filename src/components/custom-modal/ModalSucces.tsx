import BieniButton from "@/components/bieni-button/BieniButton";
import { colors } from "@/theming/colors";
import images from "@/theming/images";
import { Form, Input } from "antd";
import { CSSProperties } from "react";
import { ReactSVG } from "react-svg";

interface ModalSuccessProps {
  handleClose: () => void;
  title: string;
  contentText: string;
  closeText: string;
}

function ModalSuccess({
  handleClose,
  title,
  contentText,
  closeText,
}: ModalSuccessProps) {
  return (
    <div style={styles.container}>
      <ReactSVG src={images.ICONS_SVG.success_icon} />
      <div style={styles.title}>{title}</div>
      <div style={styles.contentText}>{contentText}</div>

      <div style={styles.buttonsRow}>
        <BieniButton
          text={closeText}
          onPress={() => {
            handleClose();
          }}
          color={colors.colorPrimary}
          height={40}
          fontSize={14}
          isCompact
        />
      </div>
    </div>
  );
}

export default ModalSuccess;

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  title: {
    color: colors.colorPrimary,

    textAlign: "center" as "center",
    fontWeight: "bold" as "bold",
    fontSize: 20,
  },
  contentText: {
    color: colors.colorPrimary,
    textAlign: "center" as "center",
    fontSize: 16,
  },
  buttonsRow: {
    display: "flex",
    marginTop: 20,
    gap: 20,
    width: "100%",
  },
};
