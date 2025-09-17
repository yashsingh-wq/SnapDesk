// utils/exportExcel.js
const { Parser } = require('json2csv');

function exportExcel(records) {
  const fields = ['student.name', 'student.studentId', 'status', 'checkInTime', 'date'];
  const opts = { fields };
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(records);
    return Buffer.from(csv);
  } catch (err) {
    console.error('Error converting to CSV:', err);
    return Buffer.from('');
  }
}

module.exports = { exportExcel };