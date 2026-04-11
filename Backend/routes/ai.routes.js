import express from 'express';
import { generateQuestions, submitAnswer, completeInterview } from '../controllers/ai.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/questions', protect, generateQuestions);
router.post('/feedback', protect, submitAnswer);
router.post('/complete', protect, completeInterview);

export default router;
