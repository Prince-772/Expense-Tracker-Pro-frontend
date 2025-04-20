import React, { useContext, useEffect } from "react";
import {
  ProfileContext,
  SideBarContext,
  TabContext,
} from "../Context/app.context";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart,
  CircleUserRound,
  CreditCard,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  ReceiptText,
  Sparkle,
  UserPlus,
  Wallet,
} from "lucide-react";
import { LogOutContext } from "../Context/logout.context";

const Sidebar = () => {
  console.log("Sidebar re-rendered");
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SideBarContext);
  const { setIsProfileOpen } = useContext(ProfileContext);
  const { ConfirmLogOut } = useContext(LogOutContext);
  const { tabOpen, setTabOpen, dashboardTabOpen, setdashboardTabOpen } =
    useContext(TabContext);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setdashboardTabOpen(path.replace("/", ""));
    setTabOpen(path.replace("/", "") || "home");
  }, [path])
  useEffect(() => {
    if (isSidebarOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  },[isSidebarOpen])
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed z-4 inset-0 lg:hidden"
          onClick={() => setIsSidebarOpen(() => false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 md:left-0 h-full w-2/3 max-w-70 lg:max-w-80 lg:hidden
      bg-white dark:bg-gray-900 shadow-lg shadow-black/50
      transition-transform duration-300 ease-in-out z-5
      ${isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full md:-translate-x-[100%]"
          } overflow-y-auto pb-10`}
      >
        {/* Sidebar Links */}
        <nav className="flex flex-col gap-4 items-center mt-20">
          {["/","/features", "/contact","/about"].some(path_=> path_ === path)
            ? [
              {
                path: "/",
                label: "Home",
                icon: <Home size={20} color="white" />,
              },
              {
                path: "/features",
                label: "Features",
                icon: <Sparkle size={20} color="white" />,
              },
              {
                path: "/contact",
                label: "Contact",
                icon: <Mail size={20} color="white" />,
              },
              {
                path: "/about",
                label: "About",
                icon: <Info size={20} color="white" />,
              },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (location.pathname === item.path)
                    e.preventDefault();
                  else setIsSidebarOpen(false)
                }}
                className={`w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg bg-gradient-to-r
                    ${tabOpen === item.label.toLocaleLowerCase()
                    ? "from-green-400 to-green-600 dark:from-green-600 dark:to-green-800"
                    : "from-blue-400 to-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-800 dark:hover:to-blue-900 active:scale-90"
                  } shadow-md 
                    transition-all duration-200 ease-out flex justify-center items-center gap-1`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))
            : [
              {
                path: "/dashboard",
                label: "Dashboard",
                icon: <LayoutDashboard size={20} color="white" />,
              },
              {
                path: "/transactions",
                label: "Transactions",
                icon: <CreditCard size={20} color="white" />,
              },
              {
                path: "/budgets",
                label: "Budgets",
                icon: <Wallet size={20} color="white" />,
              },
              {
                path: "/reports",
                label: "Reports",
                icon: <BarChart size={20} color="white" />,
              },
              {
                path: "/subscriptions",
                label: "Subscriptions",
                icon: <ReceiptText size={20} color="white" />,
              },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => {
                  if (location.pathname === item.path)
                    e.preventDefault();
                  else setIsSidebarOpen(false)
                }}
                className={`w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg bg-gradient-to-r
            ${dashboardTabOpen === item.label.toLocaleLowerCase()
                    ? "from-green-400 to-green-600 dark:from-green-600 dark:to-green-800"
                    : "from-blue-400 to-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-800 dark:hover:to-blue-900  active:scale-90"
                  } shadow-md 
            transition-all duration-200 ease-out flex justify-center items-center gap-1`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          {["/","/features", "/contact","/about"].some(path_=> path_ === path)? (
            <>
            <hr className="w-[95%] dark:text-gray-400" />
            <Link
              onClick={() => setIsSidebarOpen(false)}
              to="/login"
              className="w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg 
                bg-gradient-to-r from-blue-400 to-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-800 dark:hover:to-blue-900 shadow-md 
                transition-all ease-out active:scale-90 duration-200 flex justify-center items-center gap-1"
            >
              <LogIn size={20} color="white" />
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsSidebarOpen(false)}
              className="w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg 
                bg-gradient-to-r from-blue-400 to-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-800 dark:hover:to-blue-900 shadow-md 
                transition-all ease-out duration-200 active:scale-90 flex justify-center items-center gap-1"
            >
              <UserPlus size={20} color="white" />
              Signup
            </Link>
          </>
          ) : (
            <>
              <hr className="w-[95%]" />
              <button
                onClick={() => {
                  setIsProfileOpen((prev) => !prev)
                  setIsSidebarOpen(false)
                }}
                className={`w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg 
            bg-gradient-to-r from-blue-400 to-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-800 dark:hover:to-blue-900 shadow-md 
            transition-all ease-out duration-200 active:scale-90 flex justify-center items-center gap-1 ${path==="/profile"?"hidden":""}`}
              >
                <CircleUserRound size={20} color="white" />
                Profile
              </button>
              <button
                onClick={() => {
                  ConfirmLogOut()
                  setIsSidebarOpen(false)
                }}
                className="w-[80%] md:text-lg font-semibold text-white py-2 rounded-lg 
                  bg-gradient-to-r from-red-400 to-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-800 dark:hover:to-red-900 shadow-md 
                  transition-all ease-out duration-200 active:scale-90 flex justify-center items-center gap-1"
              >
                <LogOut size={20} color="white" />
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default React.memo(Sidebar);
