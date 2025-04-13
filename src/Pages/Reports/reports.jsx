import React, { useContext, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { AuthContext, MessageContext } from '../../Context/Auth.context';
import ProfileModule from '../../components/profileModel';
import { PieChartContext } from '../../Context/Reports/piechart.context';
import { ChevronDown, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import Loader from '../../components/Loader/loader';
import ErrorMessage from '../../components/authMessages/ErrorMessage';
import { DashboardContext } from '../../Context/userDashboard.context';
import ConfirmMessage from '../../components/authMessages/ConfirmMessage';

const Reports = () => {
  console.log("Reports rendered");
  const { user } = useContext(AuthContext);
  const { pieData, pieChartSelectionOpen, setPieChartSelectionOpen, pieOption, setPieOption, pieLoading, handleCloseError, lastIncome, lastExpense, handleOnConfirm, } = useContext(PieChartContext)
  const {
    AuthError,
    AuthConfirm
  } = useContext(MessageContext);
  const dashboardLoading = useContext(DashboardContext).loading


  const COLORS = ['#22c55e', '#ef4444'];
  const [income, expense] = [Number(pieData[0]?.value), Number(pieData[1]?.value)]
  const total = income + expense;
  const incomePercent = total > 0 ? ((income / total) * 100).toFixed(1) : 0;
  const expensePercent = total > 0 ? ((expense / total) * 100).toFixed(1) : 0;

  const netSavings = income - expense


  return (
    <div className="flex min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-gray-100">
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={(e) => handleCloseError(e)} />
      )}
      {AuthConfirm && (
        <ConfirmMessage
          value={AuthConfirm}
          onConfirm={handleOnConfirm}
        />
      )}
      {(dashboardLoading || pieLoading) && <Loader />}
      <ProfileModule user={user} />

      <main className="flex-1 px-1 lg:px-6 py-6">
        <div className="bg-white px-2 py-2 md:p-4 rounded-lg flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-1 text-center md:text-left">Reports</h2>
          <div className='reports'>
            {pieData.length === 0
              ? <div className="text-lg">No Transactions</div>
              : (<div className="piechart relative w-full flex flex-col md:flex-row border border-red-300  gap-6 p-4 rounded-xl bg-white/10 shadow-md backdrop-blur-sm">
                <div
                  onClick={() => setPieChartSelectionOpen(prev => !prev)}
                  className="z-1 flex absolute right-2 top-2 md:right-auto md:top-auto items-center gap-1 border border-gray-300 rounded-md px-1 py-1 md:px-3  bg-white cursor-pointer shadow-sm hover:bg-gray-100 active:bg-gray-100 transition">
                  <p className="text-sm font-medium text-gray-700">{pieOption.charAt(0).toUpperCase() + pieOption.slice(1)}</p>
                  <ChevronDown className={`text-gray-600 w-4 h-4 md:w-4.5 md:h-4.5 ${pieChartSelectionOpen ? "rotate-540" : ""} transition-all duration-300`} />
                  <div className={`dropdown absolute top-full right-1/2 md:right-auto md:left-1/2 bg-white shadow-gray-500 flex flex-col rounded-sm overflow-hidden ${pieChartSelectionOpen ? "max-h-30 max-w-100 shadow-[0_0_2px_1px]" : "max-h-0 max-w-0 border-none"} transition-all duration-300 ease-in-out `}>
                    {["All", "Last Five", "Last Ten", "Last 30 days", "Last 365 days"].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setPieOption(opt.toLocaleLowerCase())}
                        className={`${pieOption === opt.toLowerCase() ? "bg-green-100" : "hover:bg-blue-100 active:bg-blue-100"} px-3 py-[1px] text-sm cursor-pointer w-full text-nowrap`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Chart */}
                <div className="chart w-full md:w-1/2 h-75 md:h-auto md:aspect-square rounded-xl flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius="65%"
                        dataKey="value"
                        labelLine={true}
                        label={({ name, value, x, y }) => (
                          <text x={x} y={y + (name === "Income" ? -10 : 10)} fill={name === "Income" ? "#147839" : "#992020"} textAnchor="middle" dominantBaseline="central" style={{ fontWeight: 700 }}>
                            {`₹${value}`}
                          </text>
                        )}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip /> //TODO : customize it
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Income & Expense Details */}
                <div className="details text-base md:text-lg w-full md:w-1/2 flex flex-col gap-6 justify-center items-center">
                  <div className="income w-full h-15 bg-green-100 border border-green-500 rounded-xl flex items-center justify-between px-3 md:px-6 font-semibold text-green-700 shadow">
                    <span>Income : </span>
                    <span>₹{Number(pieData[0]?.value).toLocaleString()} ({incomePercent}%)</span>
                  </div>
                  <div className="expense w-full h-15 bg-red-100 border border-red-500 rounded-xl flex items-center justify-between px-3 md:px-6  font-semibold text-red-700 shadow">
                    <span>Expense : </span>
                    <span>₹{Number(pieData[1]?.value).toLocaleString()} ({expensePercent}%)</span>
                  </div>
                  <div className={`net-savings w-full h-15 border rounded-xl flex items-center justify-between px-3 md:px-6  font-semibold shadow ${netSavings > 0 ? "text-green-700 border-green-500 bg-green-50" : netSavings < 0 ? "text-red-700 border-red-500 bg-red-50" : "text-sky-700 border-sky-500 bg-sky-50"}`}>
                    <span>Net Savings : </span>
                    <div className='flex gap-1 items-center'>
                      <span>₹{netSavings.toLocaleString()}</span>
                      {
                        netSavings > 0 ? <TrendingUp className="text-green-700 w-4 h-4" /> :
                          netSavings < 0 ? <TrendingDown className="text-red-700 w-4 h-4" /> :
                            <Minus className="text-sky-700 w-4 h-4" />
                      }

                    </div>
                  </div>
                  <div className="balance w-full h-15 bg-blue-100 border border-blue-500 rounded-xl flex items-center justify-between px-3 md:px-6  font-semibold text-blue-700 shadow">
                    <span>Total Balance : </span>
                    <span>₹{Number(user?.balance).toLocaleString()}</span>
                  </div>

                  <hr className='text-gray-500 w-full' />

                  <div className="expense w-full h-15 bg-green-100 border border-green-500 rounded-xl flex items-center justify-between px-3 md:px-6  font-semibold text-green-700 shadow">
                    <span>Last Income :</span>
                    <span>₹{Number(lastIncome?.amount).toLocaleString()}</span>
                  </div>
                  <div className="expense w-full h-15 bg-red-100 border border-red-500 rounded-xl flex items-center justify-between px-3 md:px-6  font-semibold text-red-700 shadow">
                    <span>Last Expense :</span>
                    <span>₹{Number(lastExpense?.amount).toLocaleString()}</span>
                  </div>

                </div>
              </div>)}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Reports