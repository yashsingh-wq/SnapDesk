// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  class: { type: String },
  department: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  // Add more fields as needed
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);