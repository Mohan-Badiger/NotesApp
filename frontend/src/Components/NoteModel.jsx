
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
    try {
      await axios.post(
        `${BASE_URL}/notes`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      toast.success("Note added ✅");
      fetchNotes();
      setModelOpen(false);
    } catch {
      toast.error("Failed to add note ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <form onSubmit={addNote} className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Note</h2>

        <input
          placeholder="Title"
          className="border w-full p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          className="border w-full p-2 mb-4 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-2 justify-end">
          <button className="bg-teal-600 text-white px-4 py-2 rounded">
            Add
          </button>
          <button
            type="button"
            onClick={() => setModelOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteModel;
