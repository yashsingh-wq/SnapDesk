// utils/fraudChecker.js
// Simple example: Detect multiple scans within short interval
const suspiciousScans = {};

function fraudChecker(studentId, checkInTime) {
  const now = new Date(checkInTime).getTime();
  if (suspiciousScans[studentId]) {
    const lastTime = suspiciousScans[studentId];
    if (now - lastTime < 30000) { // 30 seconds
      suspiciousScans[studentId] = now;
      return true; // suspicious
    }
  }
  suspiciousScans[studentId] = now;
  return false;
}

module.exports = { fraudChecker };