"use client"
import { get } from "@/api/axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const data = await get(`/auth/logout`);
      if (data.status === 200) {
        toast.success(data.data.message);             
        router.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          <Link href="/addnote" className="mx-4">
            Add Note
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <Link
                href="/"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span>About</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span>Services</span>
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="flex items-center px-4 py-2 rounded hover:bg-gray-700"
              >
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-white rounded hover:bg-gray-200"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
