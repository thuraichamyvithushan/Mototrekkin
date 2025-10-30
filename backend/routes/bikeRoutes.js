import express from "express";
import multer from "multer";
import {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
} from "../controllers/bikeController.js";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createBike);
router.get("/", getAllBikes);
router.get("/:id", getBikeById);
router.put("/:id", upload.single("image"), updateBike);
router.delete("/:id", deleteBike);

export default router;