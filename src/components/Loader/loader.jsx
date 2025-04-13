import React, { useEffect } from "react";
import styles from "./loader.module.css";

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center space-y-3 border-2 p-3 bg-gray-100 rounded-md">
        <div className={` ${styles.logoBox} logobox logo text-black text-xl md:text-xl lg:text-2xl font-[inter] font-bold border`}>
          <p className="inline-block select-none">Expense Tracker PRO</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
