import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";
import { AuthContext, MessageContext } from "./Auth.context";
import { useNavigate } from "react-router-dom";

const LogOutContext = createContext();

const LogOutProvider = ({ children }) => {
  const { setAuthError, setAuthConfirm } = useContext(MessageContext);
  const navigate = useNavigate();
  const {
    setUser,
    setLastFiveTransaction,
    setAllTransactions, } = useContext(AuthContext)
  const [logoutLoading, setLogoutLoading] = useState(false);
  const ConfirmLogOut = () => {
    setAuthConfirm("Are you sure want to log out ?");
  };
  const handleLogOut = useCallback(async () => {
    setLogoutLoading(true);
    try {
      const api = import.meta.env.VITE_BACKEND_USERS_API
      await axios.post(
        `${api}/logout`,
        {},
        { withCredentials: true }
      );

      await axios.get(`${api}/dashboard`, {
        withCredentials: true,
      });
    } catch (err) {
      if (err.response.status === 401 || err.status === 401) {
        navigate("/");
        setUser(null);
        setLastFiveTransaction(null)
        setAllTransactions(null)
      } else {
        setAuthError(
          err.response?.data?.message || err.message || "LogOut Failed"
        );
      }
    } finally {
      setLogoutLoading(false);
    }
  }, []);
  return (
    <LogOutContext.Provider value={{ handleLogOut, ConfirmLogOut, logoutLoading }}>
      {children}
    </LogOutContext.Provider>
  );
};

export default LogOutProvider;
export { LogOutContext };
