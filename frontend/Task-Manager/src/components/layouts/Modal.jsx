import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-xl rounded-lg shadow-lg z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-medium text-slate-800">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
