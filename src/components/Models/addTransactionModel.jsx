import { Check, ChevronDown, IndianRupee } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

const AddTransactionModel = ({ onAddTransaction, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("")
  const options = ["Expense", "Income"]
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = useCallback((formData) => {
    const amount = Number(formData.amount);
    const remarks = formData.remarks;
    const newTxn = {
      amount,
      remarks,
      type: selected.toLowerCase()
    };
    onAddTransaction(newTxn);

  }, [selected, onAddTransaction]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-11">
      <main className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Remarks Input */}
          <div className="mb-3">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700  mb-1 ml-1">
              Remarks
            </label>
            <input
              id="remarks"
              {...register("remarks", {
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
                  value.trim().length >= 3 || "Must be at least 3 characters"
              })}
              type="text"
              className="w-full px-3 py-1 text-lg border-1 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.remarks && (
              <p className="text-red-500 ml-1">{errors.remarks.message}</p>
            )}
          </div>

          {/* Transaction Type Select */}
          <div className="type_fiels mb-3">
            <div className="relative">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Type
              </label>

              {/* Dropdown Button */}
              <button
                id="type"
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className={`flex justify-between cursor-pointer items-center w-full px-4 py-1 text-lg border rounded-md bg-white shadow-sm hover:bg-gray-100 ${selected === "Expense" ? "text-red-600" : selected === "Income" ? "text-green-600" : ""}`}
              >
                {options.includes(selected) ? selected : "Select Type"}
                <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <input type="hidden" {...register("type", { required: "Please select trasaction type" })} value={selected} />

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="absolute w-full bg-white border rounded-md shadow-md z-10">
                  {options.map((option) => (
                    <button
                      type="button"
                      key={option}
                      className={`px-4 w-full py-2 cursor-pointer rounded-md hover:bg-gray-200 flex items-center justify-between ${selected === option ? "bg-blue-100" : ""
                        } ${option === "Expense" ? "text-red-500" : option === "Income" ? "text-green-700" : ""}`}
                      onClick={() => {
                        setSelected(option);
                        setValue("type", option, { shouldValidate: true });
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
            {errors.type && (<p className="text-red-500 ml-1">{errors.type.message}</p>)}
          </div>

          {/* Amount Input */}
          <div className="mb-4 ">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700  mb-1 ml-1">
              Amount
            </label>
            <div className="relative focus-within:text-blue-500">
              <IndianRupee size={18} className="absolute top-[calc(50%-9px)] left-1" />
              <input
                id="amount"
                {...register("amount", {
                  required: "Please Enter The Amount",
                  min: {
                    value: 1,
                    message: "Must be greater or equal to 1"
                  }
                })}
                type="number"
                className="w-full pr-3 pl-5 text-lg py-1 border-1 outline-none rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
              />
            </div>

            {errors.amount && (
              <p className="text-red-500 ml-1">{errors.amount.message}</p>
            )}
          </div>

          <div className="btns flex gap-4 justify-around font-[roboto]">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onCancel}
              className="w-full hover:bg-red-500 text-red-600 hover:text-white py-2 rounded-md font-medium border border-red-600 transition">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddTransactionModel