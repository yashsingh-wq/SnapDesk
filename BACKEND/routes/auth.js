// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher');

const router = express.Router();

// Register (for admin setup, optional)
router.post('/register', async (req, res) => {
  const { username, password, name, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newTeacher = new Teacher({ username, password: hashedPassword, name, email });
    await newTeacher.save();
    res.json({ msg: 'Teacher registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ username });
    if (!teacher) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: teacher._id, role: teacher.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;