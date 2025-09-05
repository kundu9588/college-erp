const express = require("express");
const attendanceController = require("../controllers/attendanceController");
const {
  authenticateJWT,
  authorize,
} = require("../middlewares/authorizationMiddleware");
const router = express.Router();

// Create attendance session - requires "take_attendance" permission and group scope check
router.post(
  "/sessions",
  authenticateJWT,
  authorize("take_attendance", true),
  attendanceController.createSession
);

// Mark attendance records - requires "take_attendance" permission and group scope check
router.post(
  "/records",
  authenticateJWT,
  authorize("take_attendance", true),
  attendanceController.markAttendance
);

// Get attendance records for a session - requires "view_attendance" permission; adjust as needed
router.get(
  "/sessions/:session_id/records",
  authenticateJWT,
  authorize("view_attendance"),
  attendanceController.getAttendance
);

module.exports = router;
