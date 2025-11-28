import express from "express";
import helmet from "helmet";
import { errorHandler } from "../src/midlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); 


// routes
import userRoutes from "./routes/UserRoutes";
app.use("/api", userRoutes);
app.use(errorHandler);
export default app;
