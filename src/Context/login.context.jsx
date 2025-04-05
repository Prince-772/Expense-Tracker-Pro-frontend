import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { AuthContext, MessageContext } from "./Auth.context";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "./userDashboard.context";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const { setUser, } = useContext(AuthContext);
  const { setAuthError } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const {getUser} = useContext(DashboardContext)
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (formData) => {
      setLoading(true);
      setAuthError(null);
      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        await axios.post(
          `${api}/login`,
          formData,
          { withCredentials: true }
        );
        
        getUser()
        navigate("/dashboard");
      } catch (err) {
        setAuthError(
          err.response?.data?.message || err.message || "Login failed"
        );
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  return (
    <LoginContext.Provider value={{ handleLogin, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
export { LoginContext };
