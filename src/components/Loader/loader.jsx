import React, { useEffect } from "react";
import styles from "./loader.module.css";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center space-y-3 border-2 dark:border-gray-300 p-3 bg-gray-100 dark:bg-gray-900 rounded-md">
        <div className={` ${styles.logoBox} logobox bg-[linear-gradient(to_right,_#000_85%,_#00c6ff,_#30cb11,_#000)] dark:bg-[linear-gradient(to_right,_#fff_85%,_#00c6ff,_#30cb11,_#fff)] text-xl md:text-xl lg:text-2xl font-[inter] font-bold border`}>
          <p className="inline-block select-none">Expense Tracker PRO</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
