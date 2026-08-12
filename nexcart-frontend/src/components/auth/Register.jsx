import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  
  const watchPassword = watch("password");
  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[500px] w-[360px] bg-white shadow-2xl rounded-2xl py-10 sm:px-10 px-6 border border-gray-100"
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg">
            <FaUserPlus className="text-4xl" />
          </div>
          <h1 className="text-center font-montserrat lg:text-3xl text-2xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-sm">Join us and start shopping</p>
        </div>

        <hr className="mt-6 mb-8 border-gray-300" />

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          <InputField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />

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

          <InputField
            label="Confirm Password"
            required
            id="confirmPassword"
            type="password"
            message="*Confirm Password is required"
            placeholder="Re-enter your password"
            register={register}
            errors={errors}
            watch={watchPassword}
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={loader}
          type="submit"
          className="mt-8 w-full flex items-center justify-center gap-2 font-semibold text-white py-3 rounded-md shadow-lg transition hover:scale-[1.02] hover:shadow-xl bg-gradient-to-r from-blue-600 to-indigo-500"
        >
          {loader ? (
            <>
              <Spinners /> Creating...
            </>
          ) : (
            <>Register</>
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-8">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-blue-600 hover:text-indigo-600 transition underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
