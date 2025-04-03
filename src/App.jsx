import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";
import LogOutProvider from "./Context/logout.context";
import DashboardProvider from "./Context/userDashboard.context";
import AuthProvider from "./Context/Auth.context";
import AppContextProvider from "./Context/app.context";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar";
import AddTransactionProvider from "./Context/Transactions/addTransactions.context";
import AllTransactionsProvider from "./Context/allTransactions.context";
import EditTransactionProvider from "./Context/Transactions/editTransaction.context";
import DeleteTransactionProvider from "./Context/Transactions/deleteTransaction.context";

function App() {
  const hideNavSideBar = [
    "/login",
    "/signup",
    "/resetpassword",
    "/forgetpassword",
  ];
  const location = useLocation();
  const getPath = location.pathname;
  return (
    <AuthProvider>
      <DashboardProvider>
        <LogOutProvider>
          <AppContextProvider>
            {!hideNavSideBar.some((path) => path === getPath) && <Navbar />}
            {!hideNavSideBar.some((path) => path === getPath) && <Sidebar />}
            <AllTransactionsProvider>
              <DeleteTransactionProvider>
                <EditTransactionProvider>
                  <AddTransactionProvider>
                    <Outlet />
                  </AddTransactionProvider>
                </EditTransactionProvider>
              </DeleteTransactionProvider>
            </AllTransactionsProvider>
          </AppContextProvider>
        </LogOutProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
