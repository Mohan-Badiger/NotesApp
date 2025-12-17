import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteModel from "../Components/NoteModel";
import NoteCard from "../Components/NoteCard";
import { useAuth, BASE_URL } from "../context/ContexProvider";
import { toast } from "react-toastify";

const Home = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);
  const [isModelOpen, setModelOpen] = useState(false);
  const { user } = useAuth();

  // ---------------- FETCH NOTES ----------------
  const fetchNotes = async () => {
    if (!user?.token) return;

    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setNotes(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notes");
    }
  };

  // ---------------- DELETE NOTE ----------------
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  // ---------------- SEARCH FILTER ----------------
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery?.toLowerCase() || "") ||
      note.content.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Your Notes
      </h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => {
          if (!user) {
            toast.error("Login first to add notes");
            return;
          }
          setModelOpen(true);
        }}
        className="fixed bottom-6 right-6 bg-teal-600 text-white text-4xl w-14 h-14 rounded-full shadow-lg hover:bg-teal-500 transition"
      >
        +
      </button>

      {/* NOTE MODAL */}
      {isModelOpen && (
        <NoteModel
          setModelOpen={setModelOpen}
          fetchNotes={fetchNotes}
        />
      )}

      {/* NOTES GRID */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No notes found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
