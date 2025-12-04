import { Router } from "express";
const router = Router();
import "../models/ProductModel";
import AuthenticateToken from "../midlewares/authenticateToken";
// check blacklist
import CheckBlacklist from "../midlewares/CheckBlacklist";

// user Controller
import { crudController } from "../controllers/crudController";
const productController = crudController("Product");

router.post("/", AuthenticateToken, CheckBlacklist, productController.create);
router.get("/", productController.list);
router.get("/products/search", productController.search);

export default router;
