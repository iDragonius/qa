import React, { FC, ReactNode, useEffect, useRef } from "react";
import cx from "classnames";
import { useOnClickOutside } from "usehooks-ts";
interface ModalProps {
  children: ReactNode;
  open: boolean;
  disableClickOutside?: boolean;

  onClose(): void;
}

const Modal: FC<ModalProps> = ({
  children,
  open,
  disableClickOutside,
  onClose,
}) => {
  useEffect(() => {
    console.log(open);
  }, [open]);

  const modalClass = cx({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    if (!disableClickOutside && open) {
      onClose();
    }
  });
  return (
    <div className={modalClass}>
      <div className="modal-box" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
