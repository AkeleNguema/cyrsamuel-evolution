import { Router } from 'express';
import { getExamQuestions, submitExam } from '../controllers/examController';

const router = Router();

// Route GET : http://localhost:5000/api/exam/questions
router.get('/questions', getExamQuestions);

// Route POST : http://localhost:5000/api/exam/submit
router.post('/submit', submitExam);

export default router;

