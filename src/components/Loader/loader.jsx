import React, { useEffect } from "react";
import styles from "./loader.module.css";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center space-y-3 border-2 p-8 bg-gray-100 rounded-md">
        <div className="logobox logo text-black text-xl md:text-xl lg:text-2xl font-[inter] font-bold">
          <p className="inline-block">Expense</p>
          <p className="inline-block ml-1">Tracker</p>
          <p className="inline-block animate-colorful ml-1">PRO</p>
        </div>
        <div
          className={`${styles.lineLoader} relative w-[110%] h-2 overflow-hidden border-1 border-gray-900 bg-white rounded-sm`}
        >
          <div
            className={`${styles.loaderBar} absolute top-0 h-full w-full border-x-4 border-black rounded-sm`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
