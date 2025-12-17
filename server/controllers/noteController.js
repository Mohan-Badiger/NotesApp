import jwt from "jsonwebtoken";
import { Note } from "../models/noteModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// helper function
const getUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);

  return decoded.id;
};

// ---------------- GET NOTES ----------------
export const getNotes = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
};

// ---------------- ADD NOTE ----------------
export const addNote = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
};

// ---------------- DELETE NOTE ----------------
export const deleteNote = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
};
