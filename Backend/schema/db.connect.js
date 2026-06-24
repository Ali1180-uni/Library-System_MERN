import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("Connected to MongoDB");
        })
    } catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}