import React, { useCallback, useContext, useRef, useState } from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

const AllTransactionCard = ({ id, type, amount, date, remarks, isOpen, onToggle, onDeleteClick, onEditClick }) => {
  const card = useRef(null);
  const [CardStyle, setCardStyle] = useState(null);

  console.log("Transaction Card Rendered", remarks);

  const updatedDate = new Date(date).toLocaleString("en-IN", {
    timeZone: "IST",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleShowOptions = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
    if (!card.current) return;
    const WidthOfCard = card.current.offsetWidth;
    const rect = card.current.getBoundingClientRect();
    const newXcor = e.clientX - rect.left;
    const newYcor = e.clientY - rect.top;

    const newCardStyle =
      WidthOfCard / 2 >= newXcor
        ? { left: `${newXcor}px`, borderTopLeftRadius: "0px", top: `${newYcor}px` }
        : { right: `${WidthOfCard - newXcor}px`, borderTopRightRadius: "0px", top: `${newYcor}px` };
    setCardStyle(newCardStyle);
  }, [onToggle]);

  return (
    <div
      ref={card}
      onClick={handleShowOptions}
      className="flex relative items-center bg-white dark:bg-gray-700 shadow-md rounded-lg p-3 border border-gray-300 transition hover:shadow-lg mb-2"
    >
      <div className="flex flex-col w-full">
        <div className="line-clamp-1 ">
          <p className="text-sm font-medium text-gray-700 dark:text-white">{remarks}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-300">{updatedDate}</p>
      </div>
      <div className={`sm:text-lg font-semibold min-w-[80px] text-right ${type === "expense" ? "text-red-500" : "text-green-500"}`}>
        ₹{amount}
      </div>
      {/* Option icon */}
      <button className="hidden md:block cursor-pointer dark:text-white">
        <EllipsisVertical size={16} />
      </button>

      {isOpen && (
        <div
          className="btns absolute bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-50 shadow-lg rounded-lg overflow-hidden z-10"
          style={CardStyle}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle()
              onEditClick()
            }}
            className="px-4 py-2 w-full hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-900 dark:active:bg-gray-900 font-medium cursor-pointer text-gray-800 dark:text-white flex items-center gap-2 transition-all">
            <Pencil size={16} className="text-gray-600 dark:text-white" />
            <span className="text-sm">Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle()
              onDeleteClick(id);
            }}
            className="px-4 py-2 w-full hover:bg-red-50 active:bg-red-100 dark:hover:bg-gray-900 dark:active:bg-gray-900 text-red-600 font-medium cursor-pointer flex items-center gap-2 transition-all"
          >
            <Trash2 size={16} className="text-red-600" />
            <span className="text-sm">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(AllTransactionCard, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.id === nextProps.id &&
    prevProps.type === nextProps.type &&
    prevProps.amount === nextProps.amount &&
    prevProps.remarks === nextProps.remarks &&
    prevProps.isOpen === nextProps.isOpen
  );
});
