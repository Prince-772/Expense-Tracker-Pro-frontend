import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../Context/login.context";
import { AuthContext, MessageContext } from "../Context/Auth.context";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import Loader from "../components/Loader/loader";
const Login = () => {

  const { user, } = useContext(AuthContext);
  const { AuthError, setAuthError } = useContext(MessageContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { handleLogin, loading } = useContext(LoginContext);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
    },
    [setAuthError]
  );


  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3">
      {AuthError && <ErrorMessage value={AuthError} onClose={handleCloseError} />}
      {(loading || isSubmitting) && <Loader />}
      <div className="w-[min(100%,400px)] bg-white dark:bg-gray-600 shadow-lg dark:shadow-black/70 rounded-xl py-8 px-3 sm:px-8 dark:text-gray-200">
        <div className="inner-box flex flex-col gap-5">
          <div className="top flex flex-col gap-7">
            <div className="logo flex justify-center">
              <Logo />
            </div>

            <div className="text">
              <p className="header text-xl font-bold font-[roboto] text-center">
                Login
              </p>
            </div>
          </div>

          <div className="form">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <div className="email-box flex flex-col gap-1 ">
                <label htmlFor="email" className="ml-1 sm:text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter Your Email"
                  className="py-1 px-3 text-lg rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-700">{errors.email.message}</p>
                )}
              </div>
              <div className="password-box flex flex-col gap-1 ">
                <label htmlFor="password" className="ml-1 sm:text-lg">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Please enter your password",
                    })}
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="py-1 px-3 pr-8 text-lg rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                  />

                  <button
                    type="button"
                    onClick={togglePassword}
                    aria-label="Toggle password visibility"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 active:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 dark:active:text-gray-300 cursor-pointer transition"
                  >
                    {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 dark:text-red-700">{errors.password.message}</p>
                )}
              </div>

              <div className="footer flex justify-center gap-1">
                <Link
                  to="/forgetpassword"
                  className="text-blue-700 dark:text-blue-100 hover:underline active:underline text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              {/* {error && <p className="text-red-500">{error}</p>} */}

              <div className="submit flex flex-col gap-1 ">
                <button
                  type="submit"
                  disabled={(loading || isSubmitting)}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-700 active:scale-90 transition duration-300 ease-out cursor-pointer"
                >
                  {(loading || isSubmitting) ? "Loging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>

          <div className="footer flex justify-center gap-1 text-black text-sm sm:text-base">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-700 dark:text-blue-100 hover:underline active:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
