// routes/attendance.js
const express = require('express');
const Attendance = require('../models/attendance');
const Student = require('../models/student');
const { lateCalc } = require('../utils/lateCalc');
const { fraudChecker } = require('../utils/fraudChecker');

const router = express.Router();

// Middleware for auth
const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware);

// Mark attendance
router.post('/mark', async (req, res) => {
  const { studentId, checkInTime } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ msg: 'Student not found' });

    // Check for suspicious activity
    const isSuspicious = fraudChecker(studentId, checkInTime);
    const status = isSuspicious ? 'Suspicious' : lateCalc(checkInTime);

    const attendanceRecord = new Attendance({
      student: student._id,
      date: new Date(checkInTime).setHours(0,0,0,0),
      status,
      checkInTime,
      notes: isSuspicious ? 'Suspicious scan detected' : '',
    });
    await attendanceRecord.save();
    res.json(attendanceRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate report (e.g., CSV)
router.get('/report/:date', async (req, res) => {
  const { date } = req.params;
  const start = new Date(date);
  const end = new Date(date);
  end.setHours(23,59,59,999);

  const records = await Attendance.find({ date: { $gte: start, $lte: end } }).populate('student');

  const csvBuffer = utils.exportExcel(records);
  res.setHeader('Content-Disposition', `attachment; filename=attendance_${date}.csv`);
  res.setHeader('Content-Type', 'text/csv');
  res.send(csvBuffer);
});

module.exports = router;