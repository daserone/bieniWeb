import { Modal } from "antd";
import { CSSProperties, ReactNode } from "react";

interface CustomModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: ReactNode;
  closable?: boolean;
  showFooter?: boolean;
  cancelText?: string;
  okText?: string;
}

function CustomModal({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  cancelText = "Cancel",
  showFooter = false,
  okText = "Ok",
  closable = false,
}: CustomModalProps) {
  return (
    <Modal
      title=""
      open={isModalOpen}
      onOk={undefined}
      onCancel={undefined}
      children={children}
      style={styles.modal}
      closable={closable}
      footer={showFooter}
      cancelText={cancelText}
      okText={okText}
      centered
    />
  );
}

export default CustomModal;

const styles: { [key: string]: CSSProperties } = {
  modal: {
    borderRadius: 50,
  },
};
