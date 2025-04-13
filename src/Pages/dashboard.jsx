
import { Plus } from "lucide-react";
import { ExpenseCard, IncomeCard, BalanceCard } from "../components/card";
import { AuthContext, MessageContext } from "../Context/Auth.context";
import { useCallback, useContext, useEffect } from "react";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import Loader from "../components/Loader/loader";
import ConfirmMessage from "../components/authMessages/ConfirmMessage";
import { LogOutContext } from "../Context/logout.context";
import { DashboardContext } from "../Context/userDashboard.context";
import TransactionCard from "../components/transaction";
import ProfileModule from "../components/profileModel";
import AddTransactionModel from "../components/Models/addTransactionModel";
import { AddTransactionContext } from "../Context/Transactions/addTransactions.context";
import SuccessMessage from "../components/authMessages/SuccessMessage";

export default function Dashboard() {

  console.log("Dashboard Rerenderd");

  const { user,lastFiveTransactions} = useContext(AuthContext);
  const {
    AuthError,
    AuthConfirm,
    setAuthConfirm,
    AuthSuccess,
    setConfirmAction,
    confirmAction
  } = useContext(MessageContext);
  const {
    loading,
    getUser,
    handleCloseSuccess,
    handleCloseError,
    addTxnOpen,
    setAddTxnOpen } = useContext(DashboardContext);

  const { handleConfirmAdd, addLoading } = useContext(AddTransactionContext);


  useEffect(() => {
    const controller = new AbortController()
    if (!user) getUser(controller.signal)

    return () => {
      setAddTxnOpen(false)
      controller.abort()
      console.log("dashboard aborting");
      
    }
  }, [])

  const { handleLogOut, logoutLoading } = useContext(LogOutContext);

  const handleOnConfirm = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthConfirm(null);
      if (confirmAction === "deleteTransaction" || confirmAction === "editTransaction" || confirmAction === "addTransaction") {
      } else handleLogOut();

      setConfirmAction(null);
    },
    [confirmAction, setConfirmAction, setAuthConfirm, handleLogOut]
  );
  

  return (
    <div className="flex min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-gray-100">
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={handleCloseError} />
      )}
      {AuthSuccess && (
        <SuccessMessage
          value={AuthSuccess}
          onClose={(e) => handleCloseSuccess(e)}
        />
      )}
      {AuthConfirm && (
        <ConfirmMessage
          value={AuthConfirm}
          onConfirm={handleOnConfirm}
        />
      )}
      {(loading || logoutLoading || addLoading) && <Loader />}
      {/* Main Content */}
      <ProfileModule user={user} />
      <main className="flex-1 px-3 lg:px-6 py-6">
        <div className="flex flex-col gap-3 mb-6 bg-white p-3 shadow-md rounded-md">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Hello, <span className="text-blue-600">{user?.name || ""}</span>!
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <IncomeCard value={`${user?.totalIncome}`} />
            <ExpenseCard value={`${user?.totalExpense}`} />
            <BalanceCard value={`${user?.balance}`} />
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Recent Five Transactions
          </h2>
          <div className="transaction-list">
            {(!lastFiveTransactions || lastFiveTransactions.length === 0) ? (
              <div className="text-lg">No Transactions</div>
            ) : (
              lastFiveTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  type={transaction.transaction_type}
                  amount={transaction.amount}
                  date={transaction.createdAt}
                  remarks={transaction.remarks}
                />
              ))
            )}
          </div>
        </div>
        {addTxnOpen && (
          <AddTransactionModel
            onAddTransaction={handleConfirmAdd}
            onCancel={() => setAddTxnOpen(false)}
          />
        )}

        {/* Floating Add Transaction Button */}
        <button
          onClick={() => setAddTxnOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 active:scale-90 transition duration-300 ease-out text-white p-4 rounded-full shadow-md shadow-gray-500 cursor-pointer">
          <Plus />
        </button>
      </main>
    </div>

  );
}
