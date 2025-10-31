import express from "express";
import multer from "multer";
import {
  createBike,
  getAllBike,
  getBikeById,
  updateBike,
  deleteBike,
} from "../controllers/Phase3Controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createBike);
router.get("/", getAllBike);
router.get("/:id", getBikeById);
router.put("/:id", upload.single("image"), updateBike);
router.delete("/:id", deleteBike);

export default router;
