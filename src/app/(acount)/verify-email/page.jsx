"use client";
import React from "react";
import { useFormik } from "formik";
import { verifyEmailSchema } from "@/validation/schimas";
import Link from "next/link";
import { post } from "@/api/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  otp: "",
};


function verifyEmail() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: verifyEmailSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        const data = await post(`/auth/verify-email`, values);
        if (data.status === 200) {
          toast.success(data.data.message);
          action.resetForm();
          router.push("/login");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
      setLoading(false);
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please enter the OTP sent to your email
        </p>
        <form onSubmit={handleSubmit}>
          {/* Username */}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600"
            >
              Enter OTP
            </label>
            <input
              type="otp"
              id="otp"
              value={values.confirmPassword}
              onChange={handleChange}
              name="otp"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
              required
            />
            {errors.otp && <p className="text-red-500">{errors.otp}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 my-3 focus:ring-blue-400"
          >
            Verify
          </button>
          <span>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Go to login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default verifyEmail;
