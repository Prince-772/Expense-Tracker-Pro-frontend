import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { ResetPasswordContext } from "../Context/resetPassword.context";
import { MessageContext } from "../Context/Auth.context";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import SuccessMessage from "../components/authMessages/SuccessMessage";
import Loader from "../components/Loader/loader";

const ForgetPassword = () => {
  const { AuthError, setAuthError, AuthSuccess, setAuthSuccess } = useContext(MessageContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { handleGetResetCode, loading } = useContext(ResetPasswordContext);

  const handleCloseError = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthError(null);
    },
    [setAuthError]
  )
  const handleCloseSuccess = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setAuthSuccess(null);
      navigate("/resetpassword")
    },
    [setAuthSuccess, navigate]
  )

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-3">
      {AuthSuccess && <SuccessMessage value={AuthSuccess} onClose={handleCloseSuccess} />}
      {AuthError && <ErrorMessage value={AuthError} onClose={handleCloseError} />}
      {(loading || isSubmitting) && <Loader />}
      <div className="w-[min(100%,400px)] bg-white dark:text-gray-200 dark:shadow-black/70 dark:bg-gray-600 shadow-lg rounded-xl py-8 px-3 sm:px-8">
        <div className="inner-box flex flex-col gap-5">
          <div className="top flex flex-col gap-7">
            <div className="logo flex justify-center">
              <Logo />
            </div>

            <div className="text">
              <p className="header text-lg font-bold font-[roboto] text-center">
                Forgot Password
              </p>
            </div>
          </div>

          <div className="form">
            <form
              onSubmit={handleSubmit(handleGetResetCode)}
              className="flex flex-col gap-4"
            >
              <div className="email-box flex flex-col gap-1 ">
                <label htmlFor="email" className="ml-1 sm:text-lg">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

              <div className="submit flex flex-col gap-1 ">
                <button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-700 active:scale-90 transition duration-300 ease-out cursor-pointer"
                >
                  {loading || isSubmitting
                    ? "Sending Reset Code..."
                    : "Get Reset Code"}
                </button>
              </div>
            </form>
          </div>

          <div className="footer flex justify-center gap-1 text-black text-sm sm:text-base">
            <p>Remembered your password?</p>
            <Link to="/login" className="text-blue-700 dark:text-blue-100 hover:underline active:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;
