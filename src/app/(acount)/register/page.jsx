"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/validation/schimas";
import Link from "next/link";
import { post } from "@/api/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function register() {
   const [isAuth, setIsAuth] = useState(false); 
  const router = useRouter();
 useEffect(() => {
  const auth = Cookies.get("is_auth") === "true";
  setIsAuth(auth);
  if (auth) {
    router.push("/");
  }
 },[router]);


  const [loading, setloading] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, action) => {
      try {
        setloading(true);
        const data = await post(`/auth/CreateUser`, values);       
        if (data.status === 201) {
          toast.success(data.data.message);
          action.resetForm();
          router.push("/verify-email");
        }
      } catch (error) {        
        toast.error(error.response.data.error || error.response.data.errors[0].msg)
      }
      setloading(false);
    },
  });

  if (isAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 my-3 focus:ring-blue-400"
          >
            Register
          </button>
          <span>
            Already have an account?
            <Link
              href="/login"
              className="hover:text-gray-700 ml-2 text-sm font-medium text-blue-600"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default register;
