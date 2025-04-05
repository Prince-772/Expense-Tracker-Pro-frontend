import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import { AuthContext, MessageContext } from "./Auth.context";
import { DashboardContext } from "./userDashboard.context";
import { useNavigate } from "react-router-dom";

const SignupContext = createContext();

const SignupProvider = ({ children }) => {
  const { setUser } = useContext(AuthContext);
  const { setAuthError } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const {getUser} = useContext(DashboardContext)
  const navigate = useNavigate()

  const handleSignUp = useCallback(
    async (formData) => {
      setLoading(true);
      setAuthError(null);
      try {
        const api = import.meta.env.VITE_BACKEND_USERS_API
        await axios.post(
          `${api}/register`,
          formData,
          { withCredentials: true }
        );
        getUser();
        navigate("/dashboard");
      } catch (err) {
        setAuthError(
          err.response?.data?.message || err.message || "Signup failed"
        );
      } finally {
        setLoading(false);
      }
    },
    [setUser]
  );

  return (
    <SignupContext.Provider value={{ submitSignup: handleSignUp, loading }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider;
export { SignupContext };
