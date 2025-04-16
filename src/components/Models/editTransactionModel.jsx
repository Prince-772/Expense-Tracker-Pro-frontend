import { Check, ChevronDown, IndianRupee } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./transactionModel.module.css"

const EditTransactionModal = ({ transaction, onCancel, onEdit }) => {
  const { remarks, amount } = transaction
  const [id, type] = [transaction._id, transaction.transaction_type]
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(type.charAt(0).toUpperCase() + type.slice(1))
  const options = ["Expense", "Income"]
  const {
    register,

    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = useCallback((formData) => {
    const newAmount = Number(formData.newAmount);
    const newRemarks = formData.newRemarks.trim();
    if (newAmount === amount && newRemarks === remarks && type === selected.toLowerCase()) {
      return;
    } else {
      const newTxn = {
        transaction_id: id,
        amount: newAmount,
        remarks: newRemarks,
        transaction_type: selected.toLowerCase()
      };
      onEdit(newTxn);
    }
  }, [amount, remarks, type, selected, id, onEdit]);

    useEffect(() => {
      document.body.style.overflow = "hidden"
  
      return () => document.body.style.overflow = "auto"
    }, [])



  return (
    <div className={`fixed ${styles.sep} inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-5 overflow-y-auto`}>
      <main className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">Edit Transaction</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Remarks Input */}
          <div className="mb-3">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700  dark:text-gray-200 mb-1 ml-1">
              Remarks
            </label>
            <input
              defaultValue={remarks}
              id="remarks"
              {...register("newRemarks", {
                required: "Please Enter The Remarks",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters"
                },
                maxLength: {
                  value: 100,
                  message: "Maximum length allowed is 100 characters"
                },
                validate: (value) =>
                  value.trim().length >= 3 || "Must be at least 3 Characters"
              })}
              type="text"
              className="w-full px-3 py-1 text-lg dark:text-gray-100 border-1 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.newRemarks && (
              <p className="text-red-600">{errors.newRemarks.message}</p>
            )}

          </div>

          {/* Transaction Type Select */}
          <div className="mb-3 relative">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1 ml-1">
              Type
            </label>

            {/* Dropdown Button */}
            <button
              id="type"
              type="button"
              onClick={() => setIsOpen(prev => !prev)}
              className={`flex justify-between cursor-pointer items-center w-full px-4 py-1 text-lg border rounded-md bg-white dark:bg-gray-600 shadow-sm hover:bg-gray-100 active:bg-gray-100  dark:hover:bg-gray-700 dark:active:bg-gray-700 ${selected === "Expense" ? "text-red-600" : selected === "Income" ? "text-green-600 dark:text-green-500" : ""}`}
            >
              {options.some(opt => opt === selected) ? selected : "Select Type"}
              <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute w-full bg-white dark:bg-gray-800 border rounded-md shadow-md z-10 overflow-hidden">
                {options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-4 w-full py-2 cursor-pointer flex items-center justify-between ${selected === option ? "bg-blue-100 dark:bg-blue-900/50" : "hover:bg-gray-200 active:bg-gray-200  dark:hover:bg-gray-900/50  dark:active:bg-gray-900/50"
                      } ${option === "Expense" ? "text-red-600" : option === "Income" ? "text-green-700 dark:text-green-500" : ""}`}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                    {selected === option && <Check size={16} className="text-blue-500" />}
                  </button>
                ))}
              </ul>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700  dark:text-gray-200 mb-1 ml-1">
              Amount
            </label>
            <div className="relative focus-within:text-blue-500 dark:text-gray-100">
              <IndianRupee size={18} className="absolute top-[calc(50%-9px)] left-1" />
              <input
                defaultValue={amount}
                id="amount"
                {...register("newAmount", {
                  required: "Please Enter The Amount",
                  min: {
                    value: 1,
                    message: "Must be greater or equal to 1"
                  }
                })}
                type="number"
                className="w-full pr-3 pl-5 text-lg dark:text-gray-100 py-1 border-1 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>
            {errors.newAmount && (
              <p className="text-red-600">{errors.newAmount.message}</p>
            )}
          </div>

          <div className="btns flex gap-4 justify-around font-[roboto]">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onCancel}
              className="w-full hover:bg-red-500 active:bg-red-500 dark:hover:bg-red-800 dark:active:bg-red-800 text-red-600 active:scale-90 hover:text-white active:text-white py-2 rounded-md font-medium border border-red-600 transition-all duration-200 ease-out">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 active:bg-blue-700 active:scale-90 transition-all duration-200 ease-out">
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditTransactionModal;
