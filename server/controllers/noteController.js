import { Note } from "../models/noteModel.js";
import jwt from "jsonwebtoken";

// ---------------- GET NOTES ----------------
export const getNotes = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret123"); // same secret as login
    const userId = decoded.id;

    const notes = await Note.find({ user: userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// ---------------- ADD NOTE ----------------
export const addNote = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const note = new Note({
      title,
      content,
      user: userId,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Add note error:", error);
    res.status(500).json({ error: "Failed to add note" });
  }
};

// ---------------- DELETE NOTE ----------------
export const deleteNote = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secret123");
    const userId = decoded.id;

    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // ✅ Optional: make sure user can delete only their notes
    if (note.user.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
