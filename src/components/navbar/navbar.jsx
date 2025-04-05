import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { Menu, CircleUserRound, X, Bold } from "lucide-react";
import Logo from "../logo";
import React, { useContext, useEffect, useState } from "react";
import { LogOutContext } from "../../Context/logout.context";
import {
  ProfileContext,
  SideBarContext,
  TabContext,
} from "../../Context/app.context";

const NavBar = () => {
  console.log("NavBar is re-rendered");
  const { ConfirmLogOut } = useContext(LogOutContext);
  const { setIsProfileOpen } = useContext(ProfileContext);
  const { setIsSidebarOpen, isSidebarOpen } = useContext(SideBarContext);
  const { tabOpen, setTabOpen, dashboardTabOpen, setdashboardTabOpen } =
    useContext(TabContext);

  const location = useLocation();
  const getLocation = location.pathname;
  useEffect(() => {
    setdashboardTabOpen(getLocation.replace("/", ""));
    setTabOpen(getLocation.replace("/", "") || "home");
  }, [getLocation])




  return (
    <nav className="sticky top-0 w-full flex items-center justify-between h-14 md:h-16 border-red-600 text-white px-4 bg-white shadow-gray-500/50 shadow-md z-99">
      <div className="left w-full h-full flex items-center gap-1">
        {isSidebarOpen ? (
          <X
            className="text-black p-0 hidden md:block lg:hidden w-7 h-7 cursor-pointer mr-2"
            onClick={() => setIsSidebarOpen(() => false)}
          />
        ) : (
          <Menu
            className="text-black p-0 hidden md:block lg:hidden w-7 h-7 cursor-pointer mr-2"
            onClick={() => setIsSidebarOpen(() => true)}
          />
        )}
        <Logo />
        <div className="nav ml-3 lg:ml-5 text-[15px] font-[inter] text-black hidden lg:flex relative">
          <div className="flex items-center gap-4 w-full justify-between">
            {["/","/features", "/contact","/about"].some(path=> path === getLocation)
              ? [
                { path: "/", label: "Home" },
                { path: "/features", label: "Features" },
                { path: "/contact", label: "Contact" },
                { path: "/about", label: "About" },
              ].map((link) => (
                <Link
                  key={link.path}
                  onClick={(e) => {
                    if (getLocation === link.path) e.preventDefault();
                    // else handleChangeTab(link.label);
                  }}
                  to={link.path}
                  className={`${tabOpen === link.label.toLowerCase()
                      ? "text-green-600 border-b-2"
                      : styles.navItems
                    }`}
                >
                  {link.label}
                </Link>
              ))
              : [
                { path: "/dashboard", label: "Dashboard" },
                { path: "/transactions", label: "Transactions" },
                { path: "/budgets", label: "Budgets" },
                { path: "/reports", label: "Reports" },
                { path: "/subscriptions", label: "Subscriptions" },
              ].map((link) => (
                <Link
                  key={link.path}
                  onClick={(e) => {
                    if (getLocation === link.path) e.preventDefault();
                    // else handleDashboardChangeTab(link.label);
                  }}
                  to={link.path}
                  className={`${dashboardTabOpen === link.label.toLowerCase()
                      ? "text-green-600 border-b-2"
                      : styles.navItems
                    }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <div className="right h-full flex items-center gap-1">
        {isSidebarOpen ? (
          <X
            className="text-black block md:hidden w-7 h-7 cursor-pointer"
            onClick={() => setIsSidebarOpen(() => false)}
          />
        ) : (
          <Menu
            className="text-black block md:hidden w-7 h-7 cursor-pointer"
            onClick={() => setIsSidebarOpen(() => true)}
          />
        )}

        <div className="btns h-full hidden md:flex gap-3 lg:gap-5 items-center text-lg font-[roboto] font-semibold">
          {["/","/features", "/contact","/about"].some(path=> path === getLocation) ? (
            <>
              <Link
                to="/signup"
                className={`${styles.signup} ${styles.btn} text-base lg:text-lg px-4 py-1 border-2 border-blue-600 rounded-sm text-nowrap`}
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className={`${styles.login} ${styles.btn} text-base lg:text-lg px-4 py-1 border-2 border-blue-600 rounded-sm text-nowrap text-blue-600`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className={`${styles.profile} ${styles.btn} text-base rounded-md text-nowrap ${location.pathname === "/dashboard"?"lg:hidden":""}`}
              >
                <div className="group flex items-center gap-1 w-full h-full px-4 py-1 border-2 border-green-600 rounded-sm">
                  <CircleUserRound
                    size={18}
                    className="text-white group-hover:text-green-600 transition-colors duration-300"
                  />
                  Profile
                </div>
              </button>
              <button
                onClick={ConfirmLogOut}
                className={`${styles.logout} ${styles.btn} text-base text-nowrap rounded-md`}
              >
                <p className="w-full h-full px-4 py-1 border-2 border-red-600 rounded-sm">
                  Logout
                </p>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(NavBar);
