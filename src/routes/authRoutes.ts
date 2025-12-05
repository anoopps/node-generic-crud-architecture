// auth router
import { Router } from "express";
const router = Router();
import * as userController from "../controllers/userController";
import AuthenticateToken from "../midlewares/authenticateToken";
import CheckBlacklist from "../midlewares/CheckBlacklist";

//login
router.post("/login", userController.login);
router.post("/logout", CheckBlacklist, AuthenticateToken, userController.logout);
router.post("/refresh", userController.refresh);


export default router;
