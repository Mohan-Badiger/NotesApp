
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, BASE_URL } from "../context/ContexProvider";

const NoteModel = ({ setModelOpen, fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();

  const addNote = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required ❌");
      return;
    }

    if (!user?.token) {
      toast.error("Login first to add note ❌");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/notes`,
        { title, content },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("Note added successfully ✅");
      fetchNotes();
      setModelOpen(false);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error adding note:", err.response || err);
      toast.error(err.response?.data?.error || "Failed to add note ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <form
        className="bg-white rounded shadow-md w-11/12 sm:w-96 p-4 sm:p-6"
        onSubmit={addNote}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">
          Add Note
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-3 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-teal-500 transition"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => setModelOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteModel;
