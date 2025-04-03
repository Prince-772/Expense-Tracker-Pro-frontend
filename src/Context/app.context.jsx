import { createContext, useMemo, useState } from "react";
import React from "react";

const ProfileContext = createContext();
const SideBarContext = createContext();
const TabContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tabOpen, setTabOpen] = useState("home");
  const [dashboardTabOpen, setdashboardTabOpen] = useState("dashboard");

  const profileValue = useMemo(
    () => ({ isProfileOpen, setIsProfileOpen }),
    [isProfileOpen]
  );
  const sidebarValue = useMemo(
    () => ({ isSidebarOpen, setIsSidebarOpen }),
    [isSidebarOpen]
  );

  const tabValue = useMemo(
    () => ({ tabOpen, setTabOpen, dashboardTabOpen, setdashboardTabOpen }),
    [tabOpen, dashboardTabOpen]
  );

  return (
    <ProfileContext.Provider value={profileValue}>
      <SideBarContext.Provider value={sidebarValue}>
        <TabContext.Provider value={tabValue}>{children}</TabContext.Provider>
      </SideBarContext.Provider>
    </ProfileContext.Provider>
  );
};

export default AppContextProvider;
export { ProfileContext, SideBarContext,TabContext };
