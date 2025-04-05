import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MessageContext } from '../Auth.context'
import axios from 'axios'
import { DashboardContext } from '../userDashboard.context'
import { AllTransactionsContext } from '../allTransactions.context'

const EditTransactionContext = createContext()

const EditTransactionProvider = ({children}) => {
  const [editLoading, setEditLoading] = useState(false)
  const { setAuthSuccess, setAuthError,setConfirmAction } = useContext(MessageContext)
  const { getUser } = useContext(DashboardContext);
  const { getAllTransactions } = useContext(AllTransactionsContext)

  const handleConfirmEdit = useCallback(async (transaction) => {
    setEditLoading(true);
    setAuthError(null);
    setAuthSuccess(null)
    try {
      const api = import.meta.env.VITE_BACKEND_TRANSACTIONS_API
      await axios.patch(`${api}`,
        transaction, { withCredentials: true }
      )
      setConfirmAction("editTransaction");
      setAuthSuccess("Transaction Updated");
      getUser(); //updating
      getAllTransactions(); //updating
    } catch (err) {
      if (location.pathname === "/transactions") {
        setConfirmAction("editTransaction");
        setAuthError(
          err.response?.data?.message ||
          err.message ||
          "An unexpected error occurred"
        );
      }
    } finally {
      setEditLoading(false)
    }
  }, [setAuthSuccess, setAuthError, getUser, getAllTransactions])

  const editTransactionValue = useMemo(
    () => ({ handleConfirmEdit, editLoading }),
    [handleConfirmEdit, editLoading]
  )

  return (
    <EditTransactionContext.Provider value={editTransactionValue}>{children}</EditTransactionContext.Provider>
  )
}

export default EditTransactionProvider
export {EditTransactionContext}