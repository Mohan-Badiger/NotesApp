import jwt from "jsonwebtoken";
import { Note } from "../models/noteModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// 🔐 get userId safely
const getUserId = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    return null; // ❗ don't crash server
  }
};

// ---------------- ADD NOTE ----------------
export const addNote = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields required" });
    }

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Add note error:", error);
    res.status(500).json({ message: "Failed to add note" });
  }
};

// ---------------- GET NOTES ----------------
export const getNotes = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

// ---------------- DELETE NOTE ----------------
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    const deleted = await Note.findByIdAndDelete(noteId);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};
