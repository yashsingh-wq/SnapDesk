// models/teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Hashed password
  name: { type: String },
  email: { type: String, unique: true },
  role: { type: String, default: 'teacher' },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);