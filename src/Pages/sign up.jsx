import { Link, Navigate } from "react-router-dom";
import Logo from "../components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { SignupContext } from "../Context/signup.context";
import { useForm } from "react-hook-form";
import { AuthContext, MessageContext } from "../Context/Auth.context";
import ErrorMessage from "../components/authMessages/ErrorMessage";
import Loader from "../components/Loader/loader";

const Signup = () => {
  console.log("Signup is re-rendered");

  const { user,} = useContext(AuthContext);
  const { AuthError,setAuthError } = useContext(MessageContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { submitSignup,loading } = useContext(SignupContext);

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

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 p-3 relative">
      {AuthError && (
        <ErrorMessage value={AuthError} onClose={handleCloseError} />
      )}
      {loading && <Loader />}
      <div className="w-[min(100%,400px)] bg-white shadow-lg rounded-xl py-8 px-3 sm:px-8">
        <div className="inner-box flex flex-col gap-5">
          <div className="top flex flex-col gap-7">
            <div className="logo flex justify-center">
              <Logo />
            </div>

            <div className="text">
              <p className="header text-lg font-bold font-[roboto] text-center text-black">
                Register Yourself
              </p>
            </div>
          </div>

          <div className="form">
            <form
              onSubmit={handleSubmit(submitSignup)}
              className="flex flex-col gap-2 sm:gap-4"
            >
              <div className="name flex flex-col gap-1 ">
                <label htmlFor="name" className="ml-1 sm:text-lg">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter Full Name"
                  className="py-1 px-3 text-lg rounded-md outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

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
                  className="py-1 px-3 text-lg rounded-md outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
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
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                    })}
                    placeholder="Create Password"
                    className="py-1 px-3 pr-8 text-lg rounded-md outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={togglePassword}
                    aria-label="Toggle password visibility"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  id="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  className="py-1 px-3 pr-8 text-lg rounded-md outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-full"
                />
                {errors.confirm_password && (
                  <p className="text-red-500">
                    {errors.confirm_password.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  aria-label="Toggle password visibility"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showConfirmPassword ? (
                    <Eye size={22} />
                  ) : (
                    <EyeOff size={22} />
                  )}
                </button>
              </div>

              <div className="submit flex flex-col gap-1 ">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>
          </div>

          <div className="footer flex justify-center gap-1 text-black text-sm sm:text-base">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-700 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
