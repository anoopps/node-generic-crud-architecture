// auth router
import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userController";

//login
router.post("/login", userController.login);


export default router;