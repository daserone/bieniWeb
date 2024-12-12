import { colors } from "@/theming/colors";
import { Button } from "antd";
import React from "react";

interface BieniButtonProps {
  text: string;
  disabled?: boolean;
  onPress: (val: any) => void;
  color?: string;
  textColor?: string;
  height?: number;
  loading?: boolean;
  outlined?: boolean;
  icon?: React.ReactNode;
  fontSize?: number;
  isSocial?: boolean;
  fontVariant?:
    | "medium"
    | "bold"
    | "light"
    | "italic"
    | "boldItalic"
    | "mediumItalic"
    | "lightItalic"
    | undefined;
  iconLeft?: React.ReactNode;
  isCompact?: boolean;
  isThickBorder?: boolean;
  borderColor?: string;
}

const BieniButton = ({
  text,
  disabled = false,
  onPress,
  color = colors.colorPrimary,
  textColor = colors.bgWhite,
  height = 50,
  outlined = false,
  loading = false,
  icon,
  fontSize = 14,
  isSocial = false,
  fontVariant = "medium",
  iconLeft,
  isCompact = true,
  isThickBorder = false,
  borderColor = colors.colorPrimary,
}: BieniButtonProps) => {
  const shortTextIfTooLong = (text: string) => {
    if (text.length > 40) {
      return text.substr(0, 30) + "...";
    }
    return text;
  };

  return (
    <Button
      type="primary"
      onClick={onPress}
      style={{
        ...styles.button,
        color: outlined ? color : textColor,
        backgroundColor: outlined ? "transparent" : color,
        height: height,
        fontSize: fontSize,
        fontWeight: fontVariant,
        borderRadius: 50,
        border: isThickBorder
          ? `2px solid ${borderColor}`
          : `1px solid ${borderColor}`,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
      }}
      disabled={disabled}
      loading={loading}
    >
      {text}
      {icon && <span style={{ marginLeft: 10, marginTop: 5 }}>{icon}</span>}
    </Button>
  );
};

export default BieniButton;

const styles = {
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
};
