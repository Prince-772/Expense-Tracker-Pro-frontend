import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MessageContext } from '../Auth.context';
import axios from 'axios';
import { AllTransactionsContext } from '../allTransactions.context';
import { useLocation } from 'react-router-dom';
import { DashboardContext } from '../userDashboard.context';

const DeleteTransactionContext = createContext()

const DeleteTransactionProvider = ({children}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { setAuthSuccess, setAuthError } = useContext(MessageContext);
  const { getUser } = useContext(DashboardContext);
  const {getAllTransactions} = useContext(AllTransactionsContext)
  const location = useLocation()

  const deleteTransaction = useCallback(
    async (txn_id) => {
      setDeleteLoading(true);
      setAuthError(null);
      setAuthSuccess(null)
      try {
        const api = import.meta.env.VITE_BACKEND_TRANSACTIONS_API
        await axios.delete(`${api}/${txn_id}`, {
          withCredentials: true,
        });
        setAuthSuccess("Transaction Deleted");
        getUser(); //updating
        getAllTransactions(); //updating
      } catch (err) {
        if (location.pathname === "/transactions") {
          setAuthError(
            err.response?.data?.message ||
            err.message ||
            "An unexpected error occurred"
          );
        }
      } finally {
        setDeleteLoading(false);
      }
    },
    [getUser, getAllTransactions, setDeleteLoading]
  );
  const deleteTxnValue = useMemo(
    () => ({deleteTransaction,deleteLoading}),[deleteTransaction,deleteLoading]
  )
  return (
    <DeleteTransactionContext.Provider value={deleteTxnValue}>{children}</DeleteTransactionContext.Provider>
  )
}

export default DeleteTransactionProvider
export {DeleteTransactionContext}