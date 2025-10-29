import express from "express";
import { signup, login, logout, profile, makeAdmin, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, profile);
router.put("/make-admin", protect, isAdmin, makeAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;