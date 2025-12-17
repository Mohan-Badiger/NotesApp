import express from "express";
import { getNotes, addNote, deleteNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/notes", getNotes);
router.post("/notes", addNote);
router.delete("/notes/:id", deleteNote);

export default router;
