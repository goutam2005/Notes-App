"use client";
import React, { useState, useEffect, useContext } from "react";
import { put } from "@/api/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Contextnote } from "@/context/notes";
export default function EditNoteModal({ showModal, closeModal, notes }) {
  const router = useRouter();
  const {note,setnote} = useContext(Contextnote)
  const [editNote, setEditNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notes) {
      setEditNote({
        title: notes.title || "",
        description: notes.description || "",
        tag: notes.tag || "",
      });
    }
  }, [notes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notes) return;

    if (
      editNote.title.trim() === "" ||
      editNote.description.trim() === "" ||
      editNote.tag.trim() === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const data = await put(`/notes/UpdateNote/${notes._id}`, editNote);
      if (data.status === 200) {        
        toast.success(data.data.message);
        setnote(note.map((note) => (note._id === notes._id ? { ...note, ...editNote } : note)));
        
        closeModal();
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the note");
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editNote.title}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editNote.description}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={editNote.tag}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-md text-white ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
