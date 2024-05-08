import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";


function CustomModal({
  open,
  onCloseModal,
  title,
  children,
  ...props
}) {

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      styles={{
        modal: {
          borderRadius: 10,
          background: "#141416",
        },
      }}
    >
      <div className={`bg-[#141416] p-3`}>
        <p className="text-white tracking-wider text-xl mb-6 mt-4">{title}</p>
        {children}
      </div>
    </Modal>
  );
}

export default CustomModal;
