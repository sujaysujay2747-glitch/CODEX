import express from 'express';
import { COURSES } from '../../src/data/courses.js';
import { LESSONS } from '../../src/data/lessons.js';
import { QUIZZES } from '../../src/data/quizzes.js';
import { PRACTICE_PROBLEMS } from '../../src/data/practice.js';

const router = express.Router();

// GET /api/courses
router.get('/', (req, res) => {
  return res.json({ courses: COURSES });
});

// GET /api/courses/:id
router.get('/:id', (req, res) => {
  const course = COURSES.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  return res.json({ course });
});

// GET /api/lessons/:id
router.get('/lessons/:id', (req, res) => {
  const lesson = LESSONS[req.params.id];
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  return res.json({ lesson });
});

// GET /api/quizzes/:id
router.get('/quizzes/:id', (req, res) => {
  const quiz = QUIZZES[req.params.id];
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  return res.json({ quiz });
});

// GET /api/practice/:id
router.get('/practice/:id', (req, res) => {
  const practice = PRACTICE_PROBLEMS[req.params.id];
  if (!practice) return res.status(404).json({ error: 'Practice problem not found' });
  return res.json({ practice });
});

export default router;
