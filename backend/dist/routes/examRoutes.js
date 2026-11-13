"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examController_1 = require("../controllers/examController");
const router = (0, express_1.Router)();
// Route GET : http://localhost:5000/api/exam/questions
router.get('/questions', examController_1.getExamQuestions);
// Route POST : http://localhost:5000/api/exam/submit
router.post('/submit', examController_1.submitExam);
exports.default = router;
