"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "@/validation/schimas";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { post } from "@/api/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false); // Client-side authentication state

  useEffect(() => {
    const auth = Cookies.get("is_auth") === "true";
    setIsAuth(auth); // Ensure state is initialized on the client
    if (auth) {
      router.push("/");
    }
  }, [router]);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const data = await post("/auth/login", values);
        if (data.status === 201) {
          toast.success(data.data.message);
          Cookies.set("is_auth", "true");
          router.push("/");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error ||
            error.response?.data?.errors[0]?.msg ||
            "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  if (isAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  } // Prevent rendering login form during redirection

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Login
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
            <Link
              href="/reset-password/"
              className="hover:text-gray-700 mt-4 block text-sm font-medium text-blue-600"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`w-full my-3 ${
                loading ? "bg-gray-400" : "bg-purple-500 hover:bg-blue-600"
              } text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {loading ? "Loading..." : "Login"}
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
    </>
  );
}

export default Login;
