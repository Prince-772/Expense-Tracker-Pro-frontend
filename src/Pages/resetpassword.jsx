import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { ResetPasswordContext } from "../Context/resetPassword.context";
import { useForm } from "react-hook-form";
import { AuthContext, MessageContext } from "../Context/Auth.context";
import SuccessMessage from "../components/authMessages/SuccessMessage";
import Loader from "../components/Loader/loader";
import ErrorMessage from "../components/authMessages/ErrorMessage";

const ResetPassword = () => {
  console.log("reset password is re-rendered");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleChangePassword,
    userName,
    userEmail,
    loading,
    setUserName,
    setUserEmail,
    passwordUpdated,
  } = useContext(ResetPasswordContext);
  const { AuthError, setAuthError, AuthSuccess, setAuthSuccess } =
    useContext(MessageContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!passwordUpdated && (!userName || !userEmail)) {
      navigate("/forgetpassword");
    }
  }, [userName, userEmail, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
    },
    [setAuthError]
  );
  const handleCloseSuccess = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      setAuthSuccess(null);

      if (passwordUpdated) {
        setUserEmail(null);
        setUserName(null);
        navigate("/login");
      }
    },
    [setAuthSuccess, navigate, passwordUpdated]
  );

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3">
      {AuthSuccess && (
        <SuccessMessage value={AuthSuccess} onClose={handleCloseSuccess} />
      )}
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={handleCloseError} />
      )}
      {(loading || isSubmitting) && <Loader />}
      <div className="w-[min(100%,400px)] bg-white dark:bg-gray-600 shadow-lg dark:shadow-black/70 rounded-xl dark:text-gray-200 py-8 px-3 sm:px-8">
        <div className="inner-box flex flex-col gap-3">
          <div className="top flex flex-col gap-7">
            <div className="logo flex justify-center">
              <Logo />
            </div>

            <div className="text">
              <p className="header text-lg font-bold font-[roboto] text-center">
                Reset Password
              </p>
              <div className="info mt-4">
                <p className="email text-sm font-[roboto] text-center text-blue-500">
                  {userEmail}
                </p>
                <p className="name font-[roboto] text-center text-black">
                  {userName}
                </p>
              </div>
            </div>
          </div>

          <div className="form">
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="flex flex-col gap-2 sm:gap-4"
            >
              <div className="reset-code flex flex-col gap-1 ">
                <label htmlFor="reset-code" className="ml-1 sm:text-lg">
                  Reset Code
                </label>
                <input
                  type="text"
                  name="reset-code"
                  id="reset-code"
                  {...register("reset_code", {
                    required: "CODE is required",
                    minLength: { value: 6, message: "Enter exactly 6 digits" },
                    maxLength: { value: 6, message: "Enter exactly 6 digits" },
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Only numbers allowed",
                    },
                  })}
                  placeholder="Enter 6 digits Reset Code"
                  className="py-1 px-3 text-lg rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {errors.reset_code && (
                  <p className="text-red-500 dark:text-red-700">{errors.reset_code.message}</p>
                )}

                <div className="footer flex justify-center gap-1 text-black text-sm sm:text-base">
                  <p>Didn't receive the reset code?</p>
                  <Link
                    to="/forgetpassword"
                    className="text-blue-700 dark:text-blue-100 hover:underline active:underline"
                  >
                    Get code
                  </Link>
                </div>
              </div>
              <div className="password-box flex flex-col">
                <label htmlFor="password" className="ml-1 mb-1 sm:text-lg">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("new_password", {
                      required: "Enter New password",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                    })}
                    placeholder="Create new password"
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
                {errors.new_password && (
                  <p className="text-red-500 dark:text-red-700">
                    {errors.new_password.message}
                  </p>
                )}
              </div>
              <div className="confirm-password-box flex flex-col ">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password"
                    id="confirm-password"
                    {...register("confirm_password", {
                      validate: (value) =>
                        value === watch("new_password") ||
                        "Passwords do not match",
                    })}
                    placeholder="Confirm Password"
                    className="py-1 px-3 pr-8 text-lg rounded-md outline-none border border-gray-300 dark:border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    aria-label="Toggle password visibility"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 active:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 dark:active:text-gray-300 cursor-pointer transition"
                  >
                    {showConfirmPassword ? (
                      <Eye size={22} />
                    ) : (
                      <EyeOff size={22} />
                    )}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-red-500 dark:text-red-700">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
              <div className="submit flex flex-col gap-1 ">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-700 active:scale-90 transition duration-300 ease-out cursor-pointer"
                >
                  {loading || isSubmitting
                    ? "Changing Password..."
                    : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
