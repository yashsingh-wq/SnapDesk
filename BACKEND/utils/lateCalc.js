// utils/lateCalc.js
// Assuming class start time is 09:00 AM
const classStartTime = '09:00:00';

function lateCalc(checkInTimeStr) {
  const checkIn = new Date(checkInTimeStr);
  const classStart = new Date(checkIn);
  const [hours, minutes, seconds] = classStartTime.split(':');
  classStart.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds), 0);

  if (checkIn <= classStart) return 'Present';
  const diffMinutes = (checkIn - classStart) / (1000 * 60);
  return diffMinutes > 15 ? 'Late' : 'Present'; // 15 mins grace
}

module.exports = { lateCalc };