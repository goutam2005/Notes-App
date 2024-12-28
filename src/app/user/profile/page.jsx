"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "@/api/axios"; // Assuming this is a custom axios instance
import "./Profile.css"; // Ensure the file is correctly set up for Next.js
import toast from "react-hot-toast";

const ProfileCard = () => {
  const [userProfile, setUserProfile] = useState(null); // Default to null for better conditional rendering
 
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await get("auth/profile", {
          signal: controller.signal,
        });

        if (response.status === 200) {
          setUserProfile(response.data.user);
        } else {
          throw new Error("Failed to fetch profile");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          toast.error(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Cleanup function to cancel API call if component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return <p>No user profile found.</p>;
  }
  // console.log(UserProfile);
  return (
    <div className="flip-card">
      <div className="flip-card-inner flex items-center justify-center">
        {/* Front Side */}
        <div className="flip-card-front">
          <div className="avatar">
            <div className="w-24 rounded-full ">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <h2> Name: {userProfile.name}</h2>
          <p> Email : {userProfile.email}</p>
          <p> Id : {userProfile._id}</p>
          <p> Role : {userProfile.role}</p>
        </div>
        {/* Back Side */}
        <div className="flip-card-back">
          <h2>Name : {userProfile.name}</h2>
          <p> Email : {userProfile.email}</p>
          <p> Id : {userProfile._id}</p>
          <p> Role : {userProfile.role}</p>
          <div className="flex ">
            <Link href="/Edit" className="btn mx-2 btn-primary my-8">
              Edit
            </Link>
            <Link href="/" className="btn mx-2 btn-primary my-8">
              Exit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
