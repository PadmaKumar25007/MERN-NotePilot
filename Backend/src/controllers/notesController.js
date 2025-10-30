import Note from "../models/Note.js";
export async function GetNotes(req,res){
  try
  {
  const notes = await Note.find().sort({createdAt: -1}); //sort to get the newest first
  res.status(200).json(notes);
  }
  catch(error)
  {
    console.error("Error caught in GetNotes controller",error);
    res.status(500).json({Message: "Internal server error"});
  }
};

export async function GetNoteById(req,res){
  try
  {
  const note = await Note.findById(req.params.id);
  if(!note) return res.status(404).json({Message: "Note not found"});
  res.status(200).json(note);
  }
  catch(error)
  {
    console.error("Error caught in GetNoteById controller",error);
    res.status(500).json({Message: "Internal server error"});
  }
};

export async function CreateNote(req,res){
 try
 {
  const {title,content} = req.body;
  const note = new Note({title,content}); //since keys and values are having same name you can use {title,content} otherwise we needto do like {title:title,content:content}
  const savedNote = await note.save();
  res.status(200).json(savedNote);
 }
 catch(error)
 {
    console.error("Error caught in CreateNote controller",error);
    res.status(500).json({Message: "Internal server error"});
 }
};

export async function UpdateNote(req,res){
  try
  {
  const {title,content} = req.body;
  const updatedNote =  await Note.findByIdAndUpdate(
    req.params.id, //gets id from the URL given by the user
    {title,content},
    {
      new: true
    }
  );
  if(!updatedNote) return res.status(404).json({Message: "Note not found"});
  res.status(200).json({updatedNote});
  }
  catch(error)
  {
    console.error("Error caught in UpdateNote controller",error);
    res.status(500).json({Message: "Internal server error"});
  }
};

export async function DeleteNote(req,res){
  try{
    const DeletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!DeleteNote) return res.status(404).json({Message: "Note not found"});
    res.status(200).json({Message: "Deleted the note successfully"});
  }
  catch(error){
    console.error("Error caught in DeleteNote controller",error);
    res.status(500).json({Message: "Internal server error"});
  }
};