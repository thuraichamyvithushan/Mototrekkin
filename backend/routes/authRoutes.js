import express from "express";
import { signup, login, logout, profile, makeAdmin } from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, profile);
router.put("/make-admin", protect, isAdmin, makeAdmin);

export default router;