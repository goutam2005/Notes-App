"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { changePasswordSchema } from "@/validation/schimas";
import toast from "react-hot-toast";
import { post } from "@/api/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
function page() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const auth = Cookies.get("is_auth") === "true";
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const [loading, setloading] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values, action) => {
      try {
        setloading(true);
        const data = await post(`/auth/change-password`, values);
        if (data.status === 200) {
          toast.success(data.data.message);
          action.resetForm();
          router.push("/");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
      setloading(false);
    },
  });
  if (!isAuth) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={values.oldPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
              {errors.oldPassword && (
                <p className="text-red-500">{errors.oldPassword}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="Password"
                id="newPassword"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your newPassword"
                required
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword}</p>
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
              Change password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
