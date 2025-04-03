import React, { useCallback, useContext, useEffect, useState } from "react";
import ProfileModule from "../components/profileModel";
import ConfirmMessage from "../components/authMessages/ConfirmMessage";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import { ChevronDown, Plus, Search } from "lucide-react";
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
    handleOnCancel,
    handleCloseSuccess,
  } = useContext(AllTransactionsContext);

  const { deleteTransaction } = useContext(DeleteTransactionContext);
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
    if (user && !allTransactions) getAllTransactions();
  }, [user]);
  console.log("Transactions Component Rendered");

  const [openCardId, setOpenCardId] = useState(null);

  const handleDeleteClick = useCallback(
    (id) => {
      setConfirmAction("deleteTransaction");
      setAuthConfirm("Are you sure you want to delete this transaction?");
      setDeletingId(id);
    },
    [setConfirmAction, setAuthConfirm]
  );

  return (
    <div className="flex min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-gray-100">
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
          onCancel={(e) => handleOnCancel(e)}
        />
      )}
      {(loading || logoutLoading || editLoading || addLoading) && <Loader />}
      <ProfileModule user={user} />

      <main className="flex-1 px-3 lg:px-6 py-6">
        <div className="bg-white p-4 shadow-md rounded-lg flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-1">Your Transactions</h2>
          <div className="h-10 flex justify-between gap-2">
            {/* Search Input */}
            <div className="relative flex items-center w-[min(80%,400px)] border border-gray-300 rounded-md bg-white shadow-sm">
              <Search size={18} className="absolute left-3 text-black" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-3 text-sm outline-none rounded-md focus:shadow-md shadow-gray-300"
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer shadow-sm hover:bg-gray-100 transition">
              <p className="text-sm font-medium text-gray-700">Filter</p>
              <ChevronDown size={18} className="text-gray-600" />
            </div>
          </div>
          <hr className="text-gray-700" />
          <div className="transaction-list">
            {!allTransactions || allTransactions.length === 0 ? (
              <div className="text-lg">No Transactions</div>
            ) : (
              allTransactions?.map((transaction) => (
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
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-md shadow-gray-500 cursor-pointer"
        >
          <Plus />
        </button>
      </main>
    </div>
  );
}
export default React.memo(Transactions);
