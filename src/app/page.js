"use client";
import React, { useEffect, useContext, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Contextnote } from "@/context/notes";
import { del, get } from "@/api/axios";
import toast from "react-hot-toast";
import EditNoteModal from "@/app/Editnote/[...id]/Editnote";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function App() {
    const Router = useRouter();
    const { note, setnote } = useContext(Contextnote);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = Cookies.get("is_auth") === "true";
        if (!auth) {
            Router.push("/login");
        } else {
            setIsAuth(true);
        }
    }, [Router]);
    
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const { data, status } = await get(`/notes/FetchAllNotes`);
                if (status === 200) {
                    setnote(data);
                } else {
                    toast.error("Failed to fetch notes.");
                }
            } catch (error) {
                toast.error(error.response?.data?.error || "An error occurred while fetching notes.");
            } finally {
                setLoading(false);
            }
        };
    
        if (isAuth) fetchNotes();
    }, [isAuth, setnote]);
    



    if (!isAuth) {

        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const handleOpenModal = (note) => {
        setCurrentNote(note);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentNote(null);
    };

    const handleOnDelete = async (id) => {
        try {
            const data = await del(`/notes/DeleteNote/${id}`);
            if (data.status === 200) {
                toast.success("Note deleted successfully");
                setnote(note.filter((item) => item._id !== id));
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
        }
    };
    // console.log(note)
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Welcome to your Notes
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {note &&
                            note.map((note, index) => (
                                <div className="card glass w-full" key={index}>
                                    <div className="card-body">
                                        <h2 className="card-title">{note.title}</h2>
                                        <p>{note.description}</p>
                                        <p className="text-sm text-gray-600">{note.tag}</p>
                                        <div className="card-actions justify-end">
                                            <button
                                                className="btn btn-success"
                                                aria-label={`Edit note ${note.title}`}
                                                onClick={() => handleOpenModal(note)}

                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-error"
                                                aria-label={`Delete note ${note.title}`}
                                                onClick={() => handleOnDelete(note._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <EditNoteModal
                showModal={showModal}
                closeModal={handleCloseModal}
                notes={currentNote}
            />
        </>
    );
}

export default App;
