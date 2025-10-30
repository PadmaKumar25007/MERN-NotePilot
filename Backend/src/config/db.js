import mongoose from "mongoose";

export const connectDB = async() =>{
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO MONGODB SUCCESSFULLY");
}
catch(error){

    console.error("FAILED TO CONNECT WITH MONGODB",error);
    process.exit(1); // 1->Exit with failure
}
}