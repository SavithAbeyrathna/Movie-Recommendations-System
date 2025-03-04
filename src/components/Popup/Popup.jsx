import React from "react";
import { X } from "lucide-react"; // Importing Lucide React icons

const Popup = ({ title, children, onClose, actions }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-none bg-opacity-80 z-50">
      <div className="relative bg-black text-white p-6 rounded-lg shadow-lg w-120 border border-gray-600">
        {/* Close Button (Top Right Corner) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
        >
          <X size={20} /> {/* Lucide X icon */}
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>

        {/* Content (can be input, text, or any JSX) */}
        <div className="mb-4">{children}</div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`w-full py-2 rounded-md ${action.className}`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
