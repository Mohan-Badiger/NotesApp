import React from "react";
import { useAuth } from "../context/ContexProvider";
import { toast } from "react-toastify";
import { FiTrash2, FiClock } from "react-icons/fi";

const NoteCard = ({ note, deleteNote }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!user) {
      toast.error("Please login to delete a note ❌", {
        toastId: "login-error",
      });
      return;
    }

    try {
      await deleteNote(note._id);
      toast.success("Note deleted successfully 🗑️", {
        toastId: "delete-success",
      });
    } catch (error) {
      toast.error("Failed to delete note ❌", {
        toastId: "delete-failed",
      });
    }
  };

  return (
    <div
      className="bg-[#111827] border border-gray-700 p-4 sm:p-5
      rounded-md shadow-md flex flex-col justify-between
      hover:shadow-lg transition"
    >
      {/* TITLE */}
      <h2 className="font-semibold text-teal-400 text-base sm:text-lg truncate">
        {note.title}
      </h2>

      <div className="my-2 border-t border-gray-700" />

      {/* CONTENT */}
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
        {note.content}
      </p>

      {/* FOOTER */}
      <div className="mt-4 flex items-center justify-between">
        {/* DATE */}
        <div className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
          <FiClock size={14} />
          <span>{new Date(note.createdAt).toLocaleString()}</span>
        </div>

        {/* DELETE BUTTON */}
        {deleteNote && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1
            bg-red-600 hover:bg-red-500 transition
            text-white text-xs sm:text-sm px-3 py-1.5 rounded-sm"
          >
            <FiTrash2 size={14} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
