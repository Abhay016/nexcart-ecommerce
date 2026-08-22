import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const forgotPasswordHandler = async (data) => {
    setLoader(true);
    try {
      // Example API call:
      // await axios.post("/api/v1/auth/forgot-password", { email: data.email });
      toast.success("Password reset link sent to your email!");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-rose-100 py-16">
      <form
        onSubmit={handleSubmit(forgotPasswordHandler)}
        className="sm:w-[450px] w-[360px] bg-white/90 shadow-2xl rounded-2xl py-10 sm:px-10 px-6 border border-gray-100 backdrop-blur-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg">
            <AiOutlineMail className="text-4xl" />
          </div>
          <h1 className="text-center font-montserrat lg:text-3xl text-2xl font-bold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-500 text-sm text-center">
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        <hr className="mt-6 mb-8 border-gray-300" />

        {/* Input Field */}
        <InputField
          label="Email"
          required
          id="email"
          type="email"
          message="*Email is required"
          placeholder="Enter your registered email"
          register={register}
          errors={errors}
        />

        {/* Submit Button */}
        <button
          disabled={loader}
          type="submit"
          className="mt-8 w-full flex items-center justify-center gap-2 font-semibold text-white py-3 rounded-md shadow-lg transition hover:scale-[1.02] hover:shadow-xl bg-gradient-to-r from-blue-600 to-indigo-500"
        >
          {loader ? (
            <>
              <Spinners /> Sending...
            </>
          ) : (
            <>Send Reset Link</>
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">
          Remembered your password?
          <Link
            to="/login"
            className="ml-1 font-semibold text-blue-600 hover:text-indigo-600 transition underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
