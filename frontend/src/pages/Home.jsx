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

  const fetchNotes = async () => {
    if (!user?.token) return;
    try {
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setNotes(res.data);
    } catch {
      toast.error("Failed to fetch notes ❌");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Notes</h1>

      <button
        onClick={() => user ? setModelOpen(true) : toast.error("Login first ❌")}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full text-3xl"
      >
        +
      </button>

      {isModelOpen && (
        <NoteModel setModelOpen={setModelOpen} fetchNotes={fetchNotes} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes
          .filter(n =>
            n.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
          )
          .map(note => (
            <NoteCard key={note._id} note={note} fetchNotes={fetchNotes} />
          ))}
      </div>
    </div>
  );
};

export default Home;
