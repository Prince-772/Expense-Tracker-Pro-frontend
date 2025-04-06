import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { MessageContext } from "./Auth.context";
import axios from "axios";

const ResetPasswordContext = createContext();

const ResetPasswordProvider = ({ children }) => {
  const { setAuthSuccess, setAuthError } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleGetResetCode = useCallback(
    async (email) => {
      setLoading(true);
      setAuthError(null);
      setAuthSuccess(null);
      setUserEmail(null);
      setUserName(null);

      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        const response = await axios.post(
          `${api}/forgotpassword`,
          email
        );

        setAuthSuccess(response.data.message);
        setUserEmail(response.data.data.email);
        setUserName(response.data.data.name);
        setPasswordUpdated(false);
      } catch (err) {
        setAuthError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
    [setAuthError, setAuthSuccess]
  );

  const handleChangePassword = useCallback(
    async (formData) => {
      setLoading(true);
      setAuthError(null);
      setAuthSuccess(null);
      setPasswordUpdated(false);
      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        const response = await axios.post(
          `${api}/resetpassword`,
          { email: userEmail, ...formData }
        );

        setPasswordUpdated(true);
        setAuthSuccess(response.data.message);
      } catch (err) {
        setAuthError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
    [userEmail, setAuthError, setAuthSuccess]
  );

  const resetPasswordValue = useMemo(
    () => ({
      handleGetResetCode,
      handleChangePassword,
      loading,
      userEmail,
      userName,
      setUserName,
      setUserEmail,
      passwordUpdated,
    }),
    [
      handleGetResetCode,
      handleChangePassword,
      loading,
      userEmail,
      userName,
      setUserName,
      setUserEmail,
      passwordUpdated,
    ]
  );

  return (
    <ResetPasswordContext.Provider value={resetPasswordValue}>
      {children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordProvider;
export { ResetPasswordContext };
