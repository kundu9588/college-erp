const groupModel = require("../models/groupModel");
const { sendResponse } = require("../utils/responseHandler");

async function createGroup(req, res) {
  try {
    const { institution_id } = req.user; // Extract from auth middleware
    const { group_name, group_type, parent_group_id } = req.body;

    const group = await groupModel.createGroup({
      institution_id,
      group_name,
      group_type,
      parent_group_id,
    });

    return sendResponse(res, {
      success: true,
      message: "Group created",
      data: group,
      statusCode: 201,
    });
  } catch (error) {
    console.error("Create group error:", error);
    return sendResponse(res, {
      success: false,
      message: "Error creating group",
      error: { details: error.message },
      statusCode: 500,
    });
  }
}

async function addUserToGroup(req, res) {
  try {
    const { user_id, group_id } = req.body;

    await groupModel.addUserToGroup(user_id, group_id);

    return sendResponse(res, {
      success: true,
      message: "User added to group",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Add user to group error:", error);
    return sendResponse(res, {
      success: false,
      message: "Error adding user to group",
      error: { details: error.message },
      statusCode: 500,
    });
  }
}

// Additional APIs: remove user from group, list groups, list users per group...

module.exports = {
  createGroup,
  addUserToGroup,
};
