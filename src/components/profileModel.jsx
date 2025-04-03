import { UserRoundPen, X } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProfileContext } from "../Context/app.context";

const ProfileModule = ({ user }) => {
  const { isProfileOpen, setIsProfileOpen } = useContext(ProfileContext);
  const location = useLocation()
  const path = location.pathname
  console.log("Profile module re rendered");
  useEffect(() => {
    if (isProfileOpen) {
      if (path !== "/dashboard") {
        document.body.style.overflow = "hidden";
      } else {
        if (window.innerWidth >= 1024) {
          document.body.style.overflow = "auto";
        } else {
          document.body.style.overflow = "hidden";
        }
      }
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isProfileOpen, path]);


  return (
    <div className={`min-w-105 fixed ${path === "/dashboard" ? "lg:static lg:h-auto lg:w-105" : ""} w-full top-[calc(100%-480px)] md:top-[calc(50%-240px)] ${isProfileOpen ? "z-6 h-120" : "z-1 h-auto overflow-hidden"} `}>
      <div
        onClick={() => setIsProfileOpen(false)}
        className={`fixed z-6 inset-0 ${isProfileOpen ? path === "/dashboard" ? "lg:hidden" : "" : "hidden"}`}></div>
      <div className={`profile z-6 w-full md:w-105 [position:inherit] bg-blue-100 md:left-[calc(50%-210px)] transition-all duration-300 ease-in-out 
        ${isProfileOpen ?
          (path === "/dashboard" ? "h-120 translate-y-0 opacity-100 lg:h-full rounded-t-lg md:rounded-xl lg:rounded-l-none"
            : "h-120 translate-y-0 opacity-100 rounded-t-lg md:rounded-xl")
            : path === "/dashboard" ? "h-0 opacity-0 translate-y-full overflow-hidden lg:opacity-100 lg:h-full lg:translate-y-0 lg:rounded-r-xl lg:overflow-auto"
            : "opacity-100 h-0 translate-y-full overflow-hidden"} `}>

        <button
          onClick={() => setIsProfileOpen(false)}
          className={`absolute z-11 cursor-pointer left-4 top-4 p-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 ${path === "/dashboard" ? "lg:hidden" : ""}  transition duration-300`}
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <Link
          to="/profile"
          className="absolute px-4 z-11 right-4 top-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition duration-300 flex items-center gap-2"
        >
          <UserRoundPen className="w-4 h-4 md:w-5 md:h-5" /> <p className="hidden md:block">Edit</p>
        </Link>

        <div className="avtar+name h-40 md:h-60 py-5 flex justify-center items-center flex-col">
          <div className="avtar aspect-square border-2 font-[roboto] w-20 md:w-30 rounded-[50%] flex items-center justify-center text-3xl md:text-5xl bg-green-500">
            B
          </div>
          <div className="name mt-3 text-lg md:text-xl font-semibold font-[inter] overflow-x-scroll text-nowrap w-full text-center scrollbar-hide  ">
            {user?.name}
          </div>
        </div>
        <hr className="mx-2 text-gray-500" />
        <div className="px-2 py-5 flex justify-center items-start flex-col gap-1 text-sm md:text-base">
          <div className="email font-semibold font-[inter] overflow-x-scroll text-nowrap w-full scrollbar-hide ">
            Email : {user?.email}
          </div>
          <div className="profesion font-semibold font-[inter] overflow-x-scroll text-nowrap w-full scrollbar-hide ">
            Profession : Student
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileModule);
