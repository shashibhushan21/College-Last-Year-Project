import express from 'express';
import { uploadResume, getResume } from '../controllers/resume.controller.js';
import protect from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResume);

export default router;
