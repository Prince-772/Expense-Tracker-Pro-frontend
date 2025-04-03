import { createContext, useMemo, useState } from "react";

const AuthContext = createContext();
const MessageContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [lastFiveTransactions, setLastFiveTransaction] = useState(null);
  const [allTransactions, setAllTransactions] = useState(null);

  const [AuthSuccess, setAuthSuccess] = useState(null);
  const [AuthError, setAuthError] = useState(null);
  const [AuthConfirm, setAuthConfirm] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const AuthValue = useMemo(
    () => ({
      user,
      setUser,
      lastFiveTransactions,
      setLastFiveTransaction,
      allTransactions,
      setAllTransactions,
    }),
    [
      user,
      setUser,
      lastFiveTransactions,
      setLastFiveTransaction,
      allTransactions,
      setAllTransactions,
    ]
  );

  const MessageValue = useMemo(
    () => ({
      AuthError,
      setAuthError,
      AuthSuccess,
      setAuthSuccess,
      AuthConfirm,
      setAuthConfirm,
      confirmAction,
      setConfirmAction,
    }),
    [AuthError, AuthSuccess, AuthConfirm, confirmAction]
  );

  return (
    <AuthContext.Provider value={AuthValue}>
      <MessageContext.Provider value={MessageValue}>
        {children}
      </MessageContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext, MessageContext };
