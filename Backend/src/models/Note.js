import mongoose from "mongoose";

// 1.Create a schema
// 2.Model based off of that schema

const noteSchema = mongoose.Schema({
    title:{
       type:String,
       required: true,
    },
    content:{
       type:String,
       required: true,
    }
},
{timestamps:true}  // This will give you createdAt and UpdatedAt automatically
);

const Note = mongoose.model("Note",noteSchema);
export default Note;