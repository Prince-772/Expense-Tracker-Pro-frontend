import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { AuthContext, MessageContext } from "./Auth.context";
import { useLocation, useNavigate } from "react-router-dom";

const AllTransactionsContext = createContext();

const AllTransactionsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user, setAllTransactions } = useContext(AuthContext);
  const {
    setAuthSuccess,
    setAuthError,
    setAuthConfirm,
    confirmAction,
    setConfirmAction,
  } = useContext(MessageContext);
  const [deletingId, setDeletingId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [addTxnOpen, setAddTxnOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const getAllTransactions = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setAuthError(null);
    try {
      const api = import.meta.env.VITE_BACKEND_TRANSACTIONS_API
      const response = await axios.get(api,
        {
          withCredentials: true,
        }
      );
      setAllTransactions(response.data.data);
    } catch (err) {
      if (location.pathname === "/transactions") {
        setAuthError(
          err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  }, [setAllTransactions, user]);
  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
      if (
        confirmAction === "deleteTransaction" ||
        confirmAction === "editTransaction" ||
        confirmAction === "addTransaction"
      )
        setConfirmAction(null);
      else navigate("/login");
    },
    [navigate, setAuthError, setConfirmAction, confirmAction]
  );

  const handleOnCancel = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setConfirmAction(null);
      setAuthConfirm(null);
    },
    [setAuthConfirm, setConfirmAction]
  );
  const handleCloseSuccess = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthSuccess(null);

      if (confirmAction === "editTransaction") setEditing(null);
      else if (confirmAction === "addTransaction") setAddTxnOpen(false);
      setConfirmAction(null);
    },
    [setAuthSuccess, confirmAction, setConfirmAction]
  );

  const AllTransactionsValue = useMemo(
    () => ({
      getAllTransactions,
      loading,
      deletingId,
      setDeletingId,
      editing,
      setEditing,
      addTxnOpen,
      setAddTxnOpen,
      handleCloseError,
      handleOnCancel,
      handleCloseSuccess,
    }),
    [
      getAllTransactions,
      loading,
      deletingId,
      setDeletingId,
      editing,
      setEditing,
      addTxnOpen,
      setAddTxnOpen,
      handleCloseError,
      handleOnCancel,
      handleCloseSuccess,
    ]
  );

  return (
    <AllTransactionsContext.Provider value={AllTransactionsValue}>
      {children}
    </AllTransactionsContext.Provider>
  );
};

export default AllTransactionsProvider;
export { AllTransactionsContext };
