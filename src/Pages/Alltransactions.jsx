import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import ProfileModule from "../components/profileModel";
import ConfirmMessage from "../components/authMessages/ConfirmMessage";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import { ArrowUpDown, ChevronDown, Plus, Search } from "lucide-react";
import Loader from "../components/Loader/loader";
import { AuthContext, MessageContext } from "../Context/Auth.context";
import SuccessMessage from "../components/authMessages/SuccessMessage";
import AlltransactionCard from "../components/AlltransactionCard";
import { AllTransactionsContext } from "../Context/allTransactions.context";
import { useNavigate } from "react-router-dom";
import { LogOutContext } from "../Context/logout.context";
import EditTracsactionModel from "../components/Models/editTransactionModel";
import { EditTransactionContext } from "../Context/Transactions/editTransaction.context";
import { AddTransactionContext } from "../Context/Transactions/addTransactions.context";
import AddTransactionModel from "../components/Models/addTransactionModel";
import { DeleteTransactionContext } from "../Context/Transactions/deleteTransaction.context";
import { DashboardContext } from "../Context/userDashboard.context";

function Transactions() {
  const { user, allTransactions } = useContext(AuthContext);
  const {
    AuthError,
    AuthConfirm,
    setAuthConfirm,
    AuthSuccess,
    setConfirmAction,
    confirmAction,
  } = useContext(MessageContext);
  const dashboardLoading = useContext(DashboardContext).loading

  const {
    getAllTransactions,
    loading,
    deletingId,
    setDeletingId,
    editing,
    setEditing,
    addTxnOpen,
    setAddTxnOpen,
    handleCloseError,
    handleCloseSuccess,
  } = useContext(AllTransactionsContext);

  const { deleteTransaction, deleteLoading } = useContext(DeleteTransactionContext);
  const { handleConfirmEdit, editLoading } = useContext(EditTransactionContext);
  const { handleConfirmAdd, addLoading } = useContext(AddTransactionContext);

  // const navigate = useNavigate();
  const { handleLogOut, logoutLoading } = useContext(LogOutContext);

  const handleOnConfirm = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthConfirm(null);
      if (confirmAction === "deleteTransaction") {
        deleteTransaction(deletingId);
      } else if (
        confirmAction === "editTransaction" ||
        confirmAction === "addTransaction"
      ) {
      } else handleLogOut();
      setConfirmAction(null);
    },
    [confirmAction, setConfirmAction, setAuthConfirm, handleLogOut, deletingId]
  );

  useEffect(() => {
    if (!user || allTransactions) return
    const controller = new AbortController();
    getAllTransactions(controller.signal);
  
    return () => {
      controller.abort();
      console.log("aborting...");
    };
  }, [user]);
  console.log("Transactions Component Rendered");

  const [localLoading, setLocalLoading] = useState(false)
  const [openCardId, setOpenCardId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [sort, setSort] = useState("latest")
  const [search, setSearch] = useState("")
  const [updatedtxn, setUpdatedtxn] = useState(allTransactions)

  const handleDeleteClick = useCallback(
    (id) => {
      setConfirmAction("deleteTransaction");
      setAuthConfirm("Are you sure you want to delete this transaction?");
      setDeletingId(id);
    },
    [setConfirmAction, setAuthConfirm]
  );

  useEffect(() => {
    setLocalLoading(true);

    let updatedTransactions = search
      ? allTransactions?.filter(txn => 
          txn.remarks.toLowerCase().includes(search.toLowerCase().trim())
        )
      : allTransactions; // Searching

    updatedTransactions = updatedTransactions?.filter(txn => 
      filter === "all" || filter === txn.transaction_type
    ); // Filtering

    updatedTransactions = updatedTransactions ? [...updatedTransactions] : null;
    
    if (sort === "oldest") updatedTransactions.reverse();
    else if (sort === "lowest first") updatedTransactions.sort((e1, e2) => e1.amount - e2.amount);
    else if (sort === "highest first") updatedTransactions.sort((e1, e2) => e2.amount - e1.amount);

    setUpdatedtxn(updatedTransactions);

    setTimeout(()=>{setLocalLoading(false)},0);
}, [allTransactions, search, filter, sort]);


  return (
    <div className="flex min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-700">
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={(e) => handleCloseError(e)} />
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
          onConfirm={(e) => handleOnConfirm(e)}
        />
      )}
      {(dashboardLoading || loading || logoutLoading || editLoading || addLoading || deleteLoading || localLoading) && <Loader />}
      <ProfileModule user={user} />

      <main className="flex-1 px-1 lg:px-6 py-6">
        <div className="bg-white dark:bg-gray-800 px-2 py-2 md:p-4 shadow-md rounded-lg flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-1 text-center md:text-left dark:text-gray-100">Your Transactions</h2>
          <div className="h-8 md:h-10 flex justify-between gap-2">
            {/* Search Input */}
            <div className="relative flex items-center w-[min(80%,400px)] border border-gray-300 rounded-md bg-white dark:bg-gray-600 dark:text-gray-100 focus-within:shadow-sm focus-within:md:shadow-md">
              <Search size={18} className="absolute left-1 md:left-3 text-black dark:text-gray-100" />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 pl-6 md:pl-10 pr-3 text-sm outline-none rounded-md shadow-gray-300"
              />
            </div>
            <div className="flex gap-2">
              {/* Sorting Button */}
              <div
                onClick={() => setIsSortOpen(prev => !prev)}
                className="z-1 flex relative items-center gap-1 border border-gray-300 rounded-md px-1 md:px-3 py-2 bg-white dark:bg-gray-600 cursor-pointer shadow-sm hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700 transition">
                <p className="text-sm font-medium text-gray-700 dark:text-white hidden md:block">{sort.charAt(0).toUpperCase() + sort.slice(1)}</p>
                <ArrowUpDown className={`text-gray-600 dark:text-white w-4 h-4 md:w-4.5 md:h-4.5 ${isSortOpen ? "rotate-540" : ""} transition-all duration-300`} />
                <div className={`dropdown absolute top-full right-1/2 bg-white dark:bg-gray-800 shadow-gray-500 flex flex-col rounded-sm overflow-hidden ${isSortOpen ? "max-h-30 max-w-100 shadow-[0_0_2px_1px]" : "max-h-0 max-w-0 border-none"} transition-all duration-300 ease-in-out `}>
                  {["Latest", "Oldest", "Lowest First", "Highest First"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSort(opt.toLocaleLowerCase())}
                      className={`${sort === opt.toLowerCase() ? "bg-green-100 dark:bg-green-700" : "hover:bg-blue-100 dark:hover:bg-blue-900 active:bg-blue-100 dark:active:bg-blue-900"} dark:text-white px-3 py-[1px] text-sm cursor-pointer w-full text-nowrap`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {/* Filter Button */}
              <div
                onClick={() => setIsFilterOpen(prev => !prev)}
                className="z-1 flex relative items-center gap-1 border border-gray-300 rounded-md px-1 md:px-3 py-2 bg-white dark:bg-gray-600 cursor-pointer shadow-sm hover:bg-gray-100 active:bg-gray-100 dark:hover:bg-gray-700 dark:active:bg-gray-700 transition">
                <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-white">{filter.charAt(0).toUpperCase() + filter.slice(1)}</p>
                <ChevronDown className={`text-gray-600 dark:text-white w-4 h-4 md:w-4.5 md:h-4.5 ${isFilterOpen ? "rotate-540" : ""} transition-all duration-300`} />
                <div className={`dropdown absolute top-full right-1/2 bg-white dark:bg-gray-800 shadow-gray-500 flex flex-col rounded-sm overflow-hidden ${isFilterOpen ? "max-h-20 max-w-100 shadow-[0_0_2px_1px]" : "max-h-0 max-w-0 border-none"} transition-all duration-300 ease-in-out `}>
                  {["All", "Expense", "Income"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setFilter(opt.toLocaleLowerCase())}
                      className={`${filter === opt.toLowerCase() ? "bg-green-100 dark:bg-green-700" : "hover:bg-blue-100 dark:hover:bg-blue-900 active:bg-blue-100 dark:active:bg-blue-900"} dark:text-white px-3 py-[1px] text-sm cursor-pointer w-full`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className="text-gray-700" />
          <div className="transaction-list">
            {!updatedtxn || updatedtxn.length === 0 ? (
              <div className="text-lg">No Transactions</div>
            ) : (
              updatedtxn.map((transaction) => (
                <AlltransactionCard
                  key={transaction._id}
                  id={transaction._id}
                  type={transaction.transaction_type}
                  amount={transaction.amount}
                  date={transaction.createdAt}
                  remarks={transaction.remarks}
                  isOpen={openCardId === transaction._id}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={() => setEditing(transaction)}
                  onToggle={() =>
                    setOpenCardId(
                      openCardId === transaction._id ? null : transaction._id
                    )
                  }
                />
              ))
            )}
          </div>
          {editing && (
            <EditTracsactionModel
              transaction={editing}
              onEdit={(newTxn) => handleConfirmEdit(newTxn)}
              onCancel={() => setEditing(null)}
            />
          )}
          {addTxnOpen && (
            <AddTransactionModel
              onAddTransaction={handleConfirmAdd}
              onCancel={() => setAddTxnOpen(false)}
            />
          )}
        </div>
        <button
          onClick={() => setAddTxnOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 active:scale-90 transition duration-300 ease-out text-white dark:bg-blue-700 dark:hover:bg-blue-800 dark:active:bg-blue-800 p-4 rounded-full shadow-md shadow-gray-500 dark:shadow-gray-900 cursor-pointer"
        >
          <Plus />
        </button>
      </main>
    </div>
  );
}
export default React.memo(Transactions);
