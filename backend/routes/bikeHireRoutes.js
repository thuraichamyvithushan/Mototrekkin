import express from "express";
import multer from "multer";
import {
  createBikeHire,
  getAllBikeHires,
  getBikeHireById,
  updateBikeHire,
  deleteBikeHire,
} from "../controllers/bikeHireController.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createBikeHire); // Create
router.get("/", getAllBikeHires); // Read all
router.get("/:id", getBikeHireById); // Read one
router.put("/:id", upload.single("image"), updateBikeHire); // Update
router.delete("/:id", deleteBikeHire); // Delete

export default router;
