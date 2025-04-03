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
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/features", element: <div>Contact Adding Soon</div> },
      { path: "/contact", element: <div>Contact Adding Soon</div> },
      { path: "/about", element: <div>Contact Adding Soon</div> },
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
      {
        path: "/transactions",
        element: (


          <Transactions />
        ),
      },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
