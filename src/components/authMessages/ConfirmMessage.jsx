import { CircleCheck, CircleHelp } from "lucide-react";
import React, { useEffect, useRef } from "react";

const ConfirmMessage = ({ value, onConfirm, onCancel }) => {
  const okBtn = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (okBtn.current) {
      okBtn.current.focus();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Prevent Clicks Behind Popup */}
      <div className="absolute inset-0" onClick={(e) => onCancel(e)}></div>

      {/* Popup Content */}
      <div className="bg-white border border-gray-300 text-gray-800 px-4 md:px-6 py-5 rounded-lg shadow-lg z-50 flex flex-col items-center gap-3 w-[min(90%,320px)]">
        <CircleHelp size={28} className="text-blue-600" />
        <p className="md:text-xl font-medium text-center">{value}</p>

        {onConfirm && onCancel && (
          <div className="flex justify-between w-full gap-3 mt-2">
            <button
              onClick={(e) => onCancel(e)}
              className="flex-1 py-1 md:py-2 text-red-600 border border-red-500 rounded-lg bg-white hover:bg-red-500 hover:text-white transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              ref={okBtn}
              onClick={(e) => onConfirm(e)}
              className="flex-1 py-1 md:py-2 text-blue-600 border border-blue-500 rounded-lg bg-white hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmMessage;
