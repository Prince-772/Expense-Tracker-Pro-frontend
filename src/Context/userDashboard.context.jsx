import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext, MessageContext } from "./Auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardContext = createContext();
// const AddTxn = createContext

const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user, setUser,setLastFiveTransaction } =
    useContext(AuthContext);
  const {setAuthError,setConfirmAction,setAuthConfirm,setAuthSuccess,confirmAction} = useContext(MessageContext);
  const navigate = useNavigate()
  const [addTxnOpen, setAddTxnOpen] = useState(false)
  // const {handleLogOut} = useContext()
  const getUser = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const api = import.meta.env.VITE_BACKEND_USERS_API
      const response = await axios.get(
        `${api}/dashboard`,
        { withCredentials: true }
      );
      const user = response.data.userInfo;
      const lastFiveTransactions = response.data.transactions;
      
      setUser(()=>user);
      setLastFiveTransaction(()=>lastFiveTransactions)
    } catch (err) {
      if (["/dashboard","/transactions","/reports"].some(path => path === location.pathname)) {
        setAuthError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [ setUser, user]);

  useEffect(() => {
    if (!user) getUser();
  }, []);

  
  const handleCloseSuccess = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthSuccess(null);
      if (confirmAction === "addTransaction") setAddTxnOpen(false)

      setConfirmAction(null);
    },
    [setAuthSuccess, setConfirmAction, confirmAction]
  );
  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
      if (
        confirmAction === "deleteTransaction" ||
        confirmAction === "editTransaction" ||
        confirmAction === "addTransaction"
      ) setConfirmAction(null);

      else navigate("/login");
    },
    [navigate, setAuthError, setConfirmAction, confirmAction]
  );

  const dashBoardValue = useMemo(
    () => ({
      getUser,
      loading,
      handleCloseSuccess,
      handleCloseError,
      addTxnOpen,
      setAddTxnOpen}
    ), [
      getUser,
      loading,
      handleCloseSuccess,
      handleCloseError,
      addTxnOpen,
      setAddTxnOpen
    ]
  )

  return (
    <DashboardContext.Provider value={dashBoardValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
export { DashboardContext };
