"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/validation/schimas";
import toast from "react-hot-toast";
import { post } from "@/api/axios";
import { useRouter } from "next/navigation";
const initialValues = {
  password: "",
  confirmPassword: "",
};
function page() {
  const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { token } = useParams();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {  
        setLoading(true);  
        const data = await post(`/auth/reset-password/${token}`, {newPassword:values.password});
        if (data.status === 200) {
          toast.success(data.data.message);
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
      setLoading(false);
    },
  });
if(loading){
  return (<div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  )
}
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>            
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 my-3 focus:ring-blue-400"
            >
              Reset Password
            </button>           
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
