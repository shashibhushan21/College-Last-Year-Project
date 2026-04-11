import express from 'express';
import { getStats, getInterviewDetails } from '../controllers/dashboard.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/stats', protect, getStats);
router.get('/interview/:id', protect, getInterviewDetails);

export default router;
