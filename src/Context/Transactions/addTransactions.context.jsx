import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MessageContext } from '../Auth.context'
import axios from 'axios'
import { DashboardContext } from '../userDashboard.context'
import { AllTransactionsContext } from '../allTransactions.context'
import { useLocation } from 'react-router-dom'

const AddTransactionContext = createContext()

const AddTransactionProvider = ({ children }) => {
  
  const [addLoading, setAddLoading] = useState(false)
  const { setAuthSuccess, setAuthError,setConfirmAction } = useContext(MessageContext)
  const { getUser } = useContext(DashboardContext);
  const { getAllTransactions } = useContext(AllTransactionsContext)
  const location = useLocation()

  const handleConfirmAdd = useCallback(async (transaction) => {
    setAddLoading(true);
    setAuthError(null);
    setAuthSuccess(null)
    try {
      const {amount,remarks,type} = transaction
      const api = import.meta.env.VITE_BACKEND_TRANSACTIONS_API + (type === "income" ? import.meta.env.VITE_ADD_INCOME_ROUTE : import.meta.env.VITE_ADD_EXPENSE_ROUTE);
      await axios.post(api,
        {amount,remarks}, { withCredentials: true }
      )
      setConfirmAction("addTransaction");
      setAuthSuccess("Transaction Added");
      getUser(); //updating
      getAllTransactions(); //updating
    } catch (err) {
      if (location.pathname === "/transactions" || location.pathname === "/dashboard") {
        setConfirmAction("addTransaction");
        setAuthError(
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
        );
      }
    } finally {
      setAddLoading(false)
    }
  }, [setAuthSuccess, setAuthError, getUser, getAllTransactions])

  const addTransactionValue = useMemo(
    () => ({ handleConfirmAdd, addLoading }),
    [handleConfirmAdd, addLoading]
  )

  return (
    <AddTransactionContext.Provider value={addTransactionValue}>{children}</AddTransactionContext.Provider>
  )
}

export default AddTransactionProvider
export {AddTransactionContext}