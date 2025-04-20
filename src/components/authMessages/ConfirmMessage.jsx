import { CircleCheck, CircleHelp } from "lucide-react";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { MessageContext } from "../../Context/Auth.context";

const ConfirmMessage = ({ value, onConfirm }) => {
  const okBtn = useRef(null);
  const { setConfirmAction, setAuthConfirm } = useContext(MessageContext)

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (okBtn.current) {
      okBtn.current.focus();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleOnCancel = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setConfirmAction(null);
      setAuthConfirm(null);
    },
    [setAuthConfirm, setConfirmAction]
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Prevent Clicks Behind Popup */}
      <div className="absolute inset-0" onClick={(e) => handleOnCancel(e)}></div>

      {/* Popup Content */}
      <div className="bg-white border dark:bg-gray-800 border-gray-300 text-gray-800 px-4 md:px-6 py-5 rounded-lg shadow-lg z-50 flex flex-col items-center gap-3 w-[min(90%,320px)]">
        <CircleHelp size={28} className="text-blue-600" />
        <p className="md:text-lg font-medium text-center dark:text-white">{value}</p>

        {onConfirm && (
          <div className="flex justify-between w-full gap-3 mt-2">
            <button
              onClick={(e) => handleOnCancel(e)}
              className="flex-1 py-1 md:py-2 text-red-600 border border-red-500 rounded-lg bg-white dark:bg-gray-900 hover:bg-red-500 active:bg-red-500 dark:hover:bg-red-700 dark:active:bg-red-700 hover:text-white active:text-white active:scale-90 transition-all ease-out duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              ref={okBtn}
              onClick={(e) => onConfirm(e)}
              className="flex-1 py-1 md:py-2 text-blue-600 border border-blue-500 rounded-lg bg-white dark:bg-gray-900 active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white active:scale-90 transition-all ease-out duration-200 font-medium"
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
