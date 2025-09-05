const express = require("express");
const groupController = require("../controllers/groupController");
const authorize = require("../middlewares/authorizationMiddleware");
const router = express.Router();

// Protect these routes - only admins or similar can create groups or assign users
router.post("/create", authorize("manage_groups"), groupController.createGroup);
router.post(
  "/add-user",
  authorize("manage_groups"),
  groupController.addUserToGroup
);

module.exports = router;
