import React, { useState } from "react";
import axios from "axios";
import { useAuth, BASE_URL } from "../context/ContexProvider";
import { toast } from "react-toastify";
import { FiX, FiEdit3, FiType, FiAlignLeft } from "react-icons/fi";

const NoteModel = ({ setModelOpen, fetchNotes }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("Note added ✅");
      fetchNotes();
      setModelOpen(false);
    } catch {
      toast.error("Failed to add note ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <form
        onSubmit={add}
        className="relative w-[95%] max-w-md bg-[#0f172a] text-gray-100 rounded-md p-7 shadow-2xl border border-gray-700"
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => setModelOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <FiX size={22} />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-600/20 text-teal-400 rounded-sm">
            <FiEdit3 size={22} />
          </div>
          <h2 className="text-xl font-semibold tracking-wide">
            Create Note
          </h2>
        </div>

        {/* TITLE INPUT */}
        <div className="relative mb-4">
          <FiType
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            className="w-full pl-10 pr-3 py-2.5 rounded-sm bg-[#1e293b] border border-gray-600
            text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* CONTENT INPUT */}
        <div className="relative mb-6">
          <FiAlignLeft
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <textarea
            className="w-full pl-10 pr-3 py-2.5 rounded-sm bg-[#1e293b] border border-gray-600
            text-gray-100 placeholder-gray-400 resize-none
            focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Write your note..."
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* ACTION BUTTON */}
        <button
          className="w-full bg-teal-600 hover:bg-teal-500 transition
          text-white py-2.5 rounded-sm font-medium tracking-wide shadow-lg"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default NoteModel;
