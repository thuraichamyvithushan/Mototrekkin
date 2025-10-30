import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { createNZSIRegistration, getAllRegistrations, getUserRegistrations } from '../controllers/nzsiRegistrationController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

console.log('nzsiRegistration: Router loaded');
router.post('/create', protect, upload.single('licenceFile'), createNZSIRegistration);

router.get('/', protect, isAdmin, getAllRegistrations); // GET /api/nzsiRegistrations
router.get('/user', protect, getUserRegistrations);
router.get('/admin', protect, isAdmin, (req, res) => {
  res.json({ message: 'Admin route accessed' });
});

export default router;