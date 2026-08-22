import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-rose-100 py-16">
      {/* Login Form */}
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] bg-white/90 shadow-2xl rounded-2xl py-10 sm:px-10 px-6 border border-gray-100 backdrop-blur-md"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg">
            <AiOutlineLogin className="text-4xl" />
          </div>
          <h1 className="text-center font-montserrat lg:text-3xl text-2xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">Login to continue shopping</p>
        </div>

        <hr className="mt-6 mb-8 border-gray-300" />

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Enter your email"
            register={register}
            errors={errors}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-indigo-600 transition"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          disabled={loader}
          type="submit"
          className="mt-6 w-full flex items-center justify-center gap-2 font-semibold text-white py-3 rounded-md shadow-lg transition hover:scale-[1.02] hover:shadow-xl bg-gradient-to-r from-blue-600 to-indigo-500"
        >
          {loader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Login</>
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">
          Don&apos;t have an account?
          <Link
            to="/register"
            className="ml-1 font-semibold text-blue-600 hover:text-indigo-600 transition underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
