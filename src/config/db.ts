import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =  process.env.MONGO_URI || "mongodb://localhost:27017/ts_crud";

export const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connection established!");
    } catch(err){
        console.log("Database connection failed!");
        process.exit(1);
    }
};
