import React from 'react'

const ExpenseCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md border border-red-300 dark:border-red-600 font-semibold font-[inter] dark:text-white">
      Total Expense: ₹{Number(value).toLocaleString()}
    </div>
  )
})
const IncomeCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-green-100 dark:bg-green-900 rounded-md border border-green-300 dark:border-green-600 font-semibold font-[inter] dark:text-white">
      Total Income: ₹{Number(value).toLocaleString()}
    </div>
  )
})
const BalanceCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md border border-blue-300 dark:border-blue-600 font-semibold font-[inter] dark:text-white">
      Balance: ₹{Number(value).toLocaleString()}
    </div>
  )
})

export {ExpenseCard,IncomeCard,BalanceCard}