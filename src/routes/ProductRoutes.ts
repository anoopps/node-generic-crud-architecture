import { Router } from "express";
const router = Router();
import "../models/ProductModel";
import AuthenticateToken from "../midlewares/authenticateToken";

// user Controller
import { crudController } from "../controllers/crudController";
const productController = crudController("Product");

router.post("/", AuthenticateToken, productController.create);

export default router;
