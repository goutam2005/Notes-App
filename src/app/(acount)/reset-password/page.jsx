"use client";
import { post } from "@/api/axios";
import { forgotPasswordSchema } from "@/validation/schimas";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
};

function resetPassword() {
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const data = await post(`/auth/forgot-password`, values);
        if (data.status === 200) {
          toast.success(data.data.message);
          action.resetForm();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
      setLoading(false);
    },
  });
  if (loading) {
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full my-3 bg-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
          <span>
            Don't have an account?
            <Link
              href="/register"
              className="hover:text-gray-700 ml-2 text-sm font-medium text-blue-600"
            >
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default resetPassword;
