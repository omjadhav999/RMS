import express from 'express';
import { getStudentMarks } from '../controllers/studentController.js';

const router = express.Router();

// User routes
router.get('/marks/:studentID', getStudentMarks);

export default router;
