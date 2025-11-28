import { Router } from "express";
import { createUserValidator, updateUserValidation} from "../validators/userValidator";
import "../models/User";
const router = Router();

// user Controller
import { crudController } from "../controllers/crudController";
const userController = crudController("User");

// import avr
import { validate } from "../midlewares/errorHandler";



// crud endpoints of user
router.post("/users", createUserValidator,validate, userController.create);
router.get("/users", userController.list);
router.get("/users/search", userController.search);
router.get("/users/:id", userController.read);
router.patch("/users/:id", updateUserValidation, validate, userController.update);
router.delete("/users/:id", userController.delete);

export default router;
