import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext, MessageContext } from '../Auth.context';
import { DashboardContext } from '../userDashboard.context';
import { AllTransactionsContext } from '../allTransactions.context';
import { useNavigate } from 'react-router-dom';

const PieChartContext = createContext()

const PieChartProvider = ({ children }) => {
  const { user, allTransactions } = useContext(AuthContext);
  const { getUser } = useContext(DashboardContext)
  const { getAllTransactions } = useContext(AllTransactionsContext)
  const [pieChartSelectionOpen, setPieChartSelectionOpen] = useState(false)
  const [pieOption, setPieOption] = useState("all")
  const [pieData, setPieData] = useState([])
  const [pieLoading, setPieLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuthError, setConfirmAction, confirmAction } = useContext(MessageContext);
  const [lastIncome, setLastIncome] = useState({})
  const [lastExpense, setLastExpense] = useState({})


  useEffect(() => {
    if (!user || allTransactions) return
    const controller = new AbortController();
    getAllTransactions(controller.signal);

    return () => {
      controller.abort();
      console.log("aborting...");
    };
  }, [user]);


  //["All", "Last Five", "Last Ten", "Last 30 days", "Last 365 days"]
  useEffect(() => {
    let newTxns = []
    if (pieOption === "all") {
      setPieData([
        { name: 'Income', value: user?.totalIncome },
        { name: 'Expense', value: user?.totalExpense },
      ])
      setLastIncome(allTransactions?.find(txn => txn.transaction_type === "income"))
      setLastExpense(allTransactions?.find(txn => txn.transaction_type === "expense"))
      return
    } else if (pieOption === "last five") newTxns = allTransactions?.slice(0, 5)
    else if (pieOption === "last ten") newTxns = allTransactions?.slice(0, 10)
    else if (pieOption === "last 30 days") {

    } else if (pieOption === "last 365 days") {

    }
    let expense = 0, income = 0
    newTxns.forEach(txn => {
      if (txn.transaction_type === "income") income += txn.amount
      else expense += txn.amount
    })
    setLastIncome(newTxns?.find(txn => txn.transaction_type === "income"))
    setLastExpense(newTxns?.find(txn => txn.transaction_type === "expense"))
    setPieData([
      { name: 'Income', value: income },
      { name: 'Expense', value: expense },
    ])
  }, [pieOption, allTransactions])

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

  const PieChartValue = useMemo(
    () => ({ pieData, pieChartSelectionOpen, setPieChartSelectionOpen, pieOption, setPieOption, pieLoading, handleCloseError, lastIncome, lastExpense }),
    [pieData, pieChartSelectionOpen, pieOption, pieLoading, handleCloseError, lastIncome, lastExpense])
  return (
    <PieChartContext.Provider value={PieChartValue}>
      {children}
    </PieChartContext.Provider>
  )
}

export default PieChartProvider
export { PieChartContext }