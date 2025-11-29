import express from "express";
import helmet from "helmet";
import { errorHandler } from "../src/midlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/UserRoutes";

// product router
import ProductRoutes from "./routes/ProductRoutes";

// register user routes
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes)

// register product routes
app.use("/api/product", ProductRoutes);


app.use(errorHandler);
export default app;
