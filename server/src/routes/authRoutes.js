import { Router } from "express";
import { signup, login, getCurrentUser } from "../controllers/authController.js";
import { requireLogin } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireLogin, getCurrentUser);

export default router;
