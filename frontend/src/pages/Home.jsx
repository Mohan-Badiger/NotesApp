import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth, BASE_URL } from "../context/ContexProvider";
import NoteModel from "../Components/NoteModel";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotes = async () => {
    if (!user?.token) return;
    const res = await axios.get(`${BASE_URL}/notes`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, [user]);

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">My Notes</h1>

      <button
        onClick={() => user ? setOpen(true) : toast.error("Login first")}
        className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full text-3xl">
        +
      </button>

      {open && <NoteModel setModelOpen={setOpen} fetchNotes={fetchNotes} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map(n => (
          <div key={n._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{n.title}</h3>
            <p className="text-sm">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
