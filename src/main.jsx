import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/home";
import Login from "./Pages/login";
import SignUP from "./Pages/sign up";
import Dashboard from "./Pages/dashboard";
import ForgetPassword from "./Pages/forgetpassword";
import ResetPassword from "./Pages/resetpassword";
import SignupProvider from "./Context/signup.context";
import LoginProvider from "./Context/login.context";
import ResetPasswordProvider from "./Context/resetPassword.context";
import Transactions from "./Pages/Alltransactions";
import AllTransactionsProvider from "./Context/allTransactions.context";
import EditTransactionProvider from "./Context/Transactions/editTransaction.context"
import AddTransactionProvider from "./Context/Transactions/addTransactions.context";
import AddingSoon from "./Pages/addingSoon";
import NotFound from "./Pages/notFound";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <AddingSoon /> },
      { path: "/contact", element: <AddingSoon /> },
      { path: "/about", element: <AddingSoon /> },
      {
        path: "/login",
        element: (
          <LoginProvider>
            <Login />
          </LoginProvider>
        ),
      },
      {
        path: "/signup",
        element: (
          <SignupProvider>
            <SignUP />
          </SignupProvider>
        ),
      },
      {
        path: "/forgetpassword",
        element: (
          <ResetPasswordProvider>
            <ForgetPassword />
          </ResetPasswordProvider>
        ),
      },
      {
        path: "/resetpassword",
        element: (
          <ResetPasswordProvider>
            <ResetPassword />
          </ResetPasswordProvider>
        ),
      },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/transactions", element:<Transactions /> },
      { path: "/budgets", element: <AddingSoon /> },
      { path: "/reports", element: <AddingSoon /> },
      { path: "/subscriptions", element: <AddingSoon /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
