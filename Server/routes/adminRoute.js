import express from 'express';
import { uploadMarks, createAdmin } from '../controllers/adminController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// Set up multer for Excel file uploads
const upload = multer({ dest: 'uploads/' });

// Admin routes
router.post('/upload-marks', authMiddleware, upload.single('file'), uploadMarks);
router.post('/create', createAdmin);

export default router;
