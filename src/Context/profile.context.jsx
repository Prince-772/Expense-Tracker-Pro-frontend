import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext, MessageContext } from './Auth.context';
import axios from 'axios';
import { LogOutContext } from './logout.context';

const ProfileContext = createContext()


const ProfileContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const { setAuthError, confirmAction, setConfirmAction, setAuthSuccess, setAuthConfirm } = useContext(MessageContext)
  const { setUser } = useContext(AuthContext)
  const [profileLoading, setProfileLoading] = useState(false)
  const path = location.pathname
  const { handleLogOut, logoutLoading } = useContext(LogOutContext)

  const handleSaveChanges = useCallback(
    async (details) => {
      setProfileLoading(true)
      setAuthError(null)
      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        const response = await axios.patch(`${api}/editprofile`, {
          ...(details.newName && { newName: details.newName }),
          ...(details.newProfession && { newProfession: details.newProfession })
        }, { withCredentials: true })
        setAuthSuccess("Profile Updated");
        setUser(response.data.userInfo) //updating

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
    }, [path])

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

  const handleOnConfirm = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthConfirm(null);
      if (!(confirmAction === "deleteTransaction") && !(confirmAction === "editTransaction") && !(confirmAction === "addTransaction") && !(confirmAction === "editProfile")) {
        handleLogOut()
      }
      setConfirmAction(null);
    },
    [confirmAction, handleLogOut]
  );

  const ProfileValues = useMemo(
    () => ({ handleCloseError, profileLoading, handleCloseSuccess, handleSaveChanges, handleOnConfirm, logoutLoading }),
    [handleCloseError, profileLoading, handleCloseSuccess, handleSaveChanges, handleOnConfirm, logoutLoading]
  )
  return (
    <ProfileContext.Provider value={ProfileValues}>{children}</ProfileContext.Provider>
  )
}

export default ProfileContextProvider
export { ProfileContext }