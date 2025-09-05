const attendanceModel = require('../models/attendanceModel');
const { sendResponse } = require('../utils/responseHandler');

async function createSession(req, res) {
  try {
    const { institution_id, user_id } = req.user;
    const { group_id, session_date, session_name } = req.body;

    const session = await attendanceModel.createSession({
      institution_id,
      group_id,
      session_date,
      session_name,
      created_by: user_id,
    });

    return sendResponse(res, { success: true, message: 'Session created', data: session, statusCode: 201 });
  } catch (error) {
    console.error('Create session error:', error);
    return sendResponse(res, { success: false, message: 'Failed to create session', error: { details: error.message }, statusCode: 500 });
  }
}

async function markAttendance(req, res) {
  try {
    const { session_id, records } = req.body;

    await attendanceModel.markAttendanceRecords(session_id, records);

    return sendResponse(res, { success: true, message: 'Attendance marked', statusCode: 200 });
  } catch (error) {
    console.error('Mark attendance error:', error);
    return sendResponse(res, { success: false, message: 'Failed to mark attendance', error: { details: error.message }, statusCode: 500 });
  }
}

async function getAttendance(req, res) {
  try {
    const { session_id } = req.params;
    const records = await attendanceModel.getAttendanceRecords(session_id);

    return sendResponse(res, { success: true, message: 'Attendance records fetched', data: records, statusCode: 200 });
  } catch (error) {
    console.error('Get attendance error:', error);
    return sendResponse(res, { success: false, message: 'Failed to get attendance', error: { details: error.message }, statusCode: 500 });
  }
}

module.exports = {
  createSession,
  markAttendance,
  getAttendance,
};
