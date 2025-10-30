import express from 'express';
import {GetNoteById,GetNotes,CreateNote,UpdateNote,DeleteNote} from '../controllers/notesController.js';

const router = express.Router();

router.get("/:id", GetNoteById);
router.get("/", GetNotes);
router.post("/", CreateNote);
router.put("/:id", UpdateNote);
router.delete("/:id", DeleteNote);

export default router;