import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext, MessageContext } from './Auth.context';
import axios from 'axios';
import { DashboardContext } from './userDashboard.context';

const ProfileContext = createContext()


const ProfileContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const { setAuthError, confirmAction, setConfirmAction, setAuthSuccess, } = useContext(MessageContext)
  const {getUser} = useContext(DashboardContext)
  const [profileLoading, setProfileLoading] = useState(false)
  const path = location.pathname

  const handleSaveChanges = useCallback(
   async (details) => {
      setProfileLoading(true)
      setAuthError(null)
      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        await axios.patch(`${api}/editprofile`, {
          ...(details.newName && { newName: details.newName }),
          ...(details.newProfession && { newProfession: details.newProfession })
        }, { withCredentials: true })
        setAuthSuccess("Profile Updated");
        getUser() //updating
        
      } catch (err) {
        if (path === "/profile") {
          setConfirmAction("editProfile")
          setAuthError(
            err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred"
          );
        }
      } finally {
        setProfileLoading(false)
      }
    }, [path,getUser])

  const handleCloseSuccess = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthSuccess(null);
      setConfirmAction(null);
    },
    [setAuthSuccess, setConfirmAction]
  );

  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
      if (
        confirmAction === "deleteTransaction" ||
        confirmAction === "editTransaction" ||
        confirmAction === "addTransaction" ||
        confirmAction === "editProfile"
      ) setConfirmAction(null);

      else navigate("/login");
    },
    [navigate, setAuthError, setConfirmAction, confirmAction]
  );

  const ProfileValues = useMemo(
    () => ({ handleCloseError,profileLoading,handleCloseSuccess,handleSaveChanges  }),
    [handleCloseError,profileLoading,handleCloseSuccess,handleSaveChanges ]
  )
  return (
    <ProfileContext.Provider value={ProfileValues}>{children}</ProfileContext.Provider>
  )
}

export default ProfileContextProvider
export { ProfileContext }