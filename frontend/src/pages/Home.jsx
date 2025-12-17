import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModel from "../Components/NoteModel";
import NoteCard from "../Components/NoteCard";
import { useAuth, BASE_URL } from "../context/ContexProvider";
import { toast } from "react-toastify";

const Home = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);
  const [isModelOpen, setModelOpen] = useState(false);
  const { user } = useAuth(); // ✅ get real logged-in user

  // Fetch notes
  const fetchNotes = async () => {
    if (!user?.token) return; // no token → no fetch

    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${user.token}` }, // ✅ use real JWT
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to fetch notes ❌");
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (!user?.token) {
      toast.error("Login first ❌");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted ✅");
    } catch (err) {
      console.error(err.response || err);
      toast.error("Failed to delete note ❌");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]); // fetch again if user changes

  // Filter notes based on search query
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-2 sm:p-2 md:p-4">
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-5 sm:mb-6">
        Your Notes
      </h1>

      <button
        onClick={() => {
          if (!user) {
            toast.error("Login first to add a new note ❌");
            return;
          }
          setModelOpen(true);
        }}
        className="fixed right-4 sm:right-6 bottom-4 sm:bottom-6 text-3xl sm:text-4xl bg-teal-600 text-white p-4 sm:p-5 rounded-full shadow-lg hover:bg-teal-500 transition"
      >
        +
      </button>

      {isModelOpen && <NoteModel setModelOpen={setModelOpen} fetchNotes={fetchNotes} />}

      {filteredNotes.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-base sm:text-lg">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
