import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
dotenv.config();


connectDB();
const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
});