import React from "react";

const TransactionCard = ({ type, amount, date, remarks }) => {
  console.log("Transaction Card Rendered", remarks);

  const updatedDate = new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-300 transition hover:shadow-md mb-2 w-full">
      <div className="flex flex-col w-full">
        <div className="line-clamp-1 ">
          <p className="text-sm font-medium text-gray-700 dark:text-white">{remarks}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-300">{updatedDate}</p>
      </div>

      <div
        className={`sm:text-lg font-semibold min-w-[80px] text-right ${type === "expense" ? "text-red-500" : "text-green-500"
          }`}
      >
        ₹{amount}
      </div>
    </div>

  );
};

export default React.memo(TransactionCard);
