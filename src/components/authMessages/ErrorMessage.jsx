import React, { useEffect, useRef } from "react";
import { CircleX } from "lucide-react"
const ErrorMessage = ({ value, onClose }) => {
  const okBtn = useRef(null)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (okBtn.current) {
      okBtn.current.focus()
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Prevent Clicks Behind Popup */}
      <div className="absolute inset-0" onClick={(e) => onClose(e)}></div>

      {/* Popup Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-300 text-gray-800 px-4 md:px-6 py-5 rounded-lg shadow-lg z-50 flex flex-col items-center gap-3 w-[min(90%,320px)]">
        <CircleX size={28} className="text-red-600" />
        <p className="md:text-lg font-medium text-center dark:text-white">{value}</p>

        {onClose && (
          <button
            ref={okBtn}
            onClick={(e) => onClose(e)}
            className="mt-2 w-1/2 py-1 md:py-2 text-red-600 border border-red-500 rounded-lg bg-white dark:bg-gray-900 hover:bg-red-600 active:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-700 hover:text-white active:text-white active:scale-90 transition-all ease-out duration-200 font-medium"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
