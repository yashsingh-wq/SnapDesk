// routes/students.js
const express = require('express');
const Student = require('../models/student');
const authMiddleware = require('../middlewares/auth'); // JWT middleware

const router = express.Router();

router.use(authMiddleware); // Protect routes

// Create Student
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Update Student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;