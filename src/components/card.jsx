import React from 'react'

const ExpenseCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-red-100 rounded-md border border-red-300 font-semibold font-[inter]">
      Total Expense: ₹{Number(value).toLocaleString()}
    </div>
  )
})
const IncomeCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-green-100 rounded-md border border-green-300 font-semibold font-[inter]">
      Total Income: ₹{Number(value).toLocaleString()}
    </div>
  )
})
const BalanceCard = React.memo(({value}) => {
  return (
    <div className="p-4 bg-blue-100 rounded-md border border-blue-300 font-semibold font-[inter]">
      Balance: ₹{Number(value).toLocaleString()}
    </div>
  )
})

export {ExpenseCard,IncomeCard,BalanceCard}