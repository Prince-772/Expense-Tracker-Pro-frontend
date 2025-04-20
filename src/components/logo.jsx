import { Link } from "react-router-dom";
import React from "react";
const Logo = React.memo(() => {
  
  return (
    <Link to="/" className="logobox logo text-black dark:text-gray-100 text-xl md:text-xl lg:text-2xl font-[inter] font-bold">
      <p className="inline-block">Expense</p>
      <p className="inline-block ml-1">Tracker</p>
      <p className="inline-block animate-colorful ml-1">PRO</p>
    </Link>
  );
});

export default Logo;
