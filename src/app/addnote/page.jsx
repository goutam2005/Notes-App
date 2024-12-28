"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { addNoteSchema } from "@/validation/schimas";
import { useRouter } from "next/navigation";
import { post } from "@/api/axios";
const initialValues = {
  title: "",
  description: "",
  tag: "",
};

const AddNote = () => {
  const router = useRouter();
  const {
    values: note,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: addNoteSchema,
    onSubmit: async (values, action) => {
      try {
        const data = await post("/notes/CreateNote", values);

        if (data.status === 200) {
          toast.success(data.data.message);
          action.resetForm();
          router.push("/");
        }
      } catch (error) {
        toast.error(error.response.data.errors[0].msg);
      }
    },
  });

  return (
    <>
      <div className="h-screen bg-[url('https://images.pexels.com/photos/315791/pexels-photo-315791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <form
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Add Note
            </h1>

            {/* Title */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={note.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={note.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            {/* Tag */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="tag"
              >
                Tag
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={note.tag}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder="Enter tag"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-medium py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
