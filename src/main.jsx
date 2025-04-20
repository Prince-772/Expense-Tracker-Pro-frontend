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
import AddingSoon from "./Pages/addingSoon";
import NotFound from "./Pages/notFound";
import Reports from "./Pages/Reports/reports";
import PieChartProvider from "./Context/Reports/piechart.context";
import Profile from "./Pages/Profile";
import ProfileContextProvider from "./Context/profile.context";
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
      { path: "/transactions", element: <Transactions /> },
      { path: "/budgets", element: <AddingSoon /> },
      { path: "/reports", element: <PieChartProvider><Reports /></PieChartProvider> },
      { path: "/subscriptions", element: <AddingSoon /> },
      { path: "/profile", element: <ProfileContextProvider><Profile /></ProfileContextProvider> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
