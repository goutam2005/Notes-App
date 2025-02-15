"use client";
import Link from "next/link";
import React, {  useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <>
      <div className="navbar bg-gray-800">
        <div className="flex-1">
         <div className=" mx-10  text-white normal-case text-xl">Welcome To My Website</div>
       
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/user/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <Link href="/user/changePassword">ChangePassword</Link>
                </li>
              </ul>
            </div>
          
        </div>
      </div>
      {isAuth === null && (
        <div className="flex bg-white items-center justify-center h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Navbar;
