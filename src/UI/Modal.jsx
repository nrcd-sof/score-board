import React from "react";
import { createPortal } from "react-dom";

import { RiCloseFill } from "react-icons/ri";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-100">
      <div className="bg-white p-6 rounded shadow-lg">
        <span
          className="absolute top-2 bg-red-300 hover:bg-red-500 rounded-full right-2 cursor-pointer"
          onClick={onClose}
        >
          <RiCloseFill className="size-10 " />
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("header")
  );
};

export default Modal;
