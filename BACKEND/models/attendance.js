// models/attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Late', 'Absent', 'Suspicious'], required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);