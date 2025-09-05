const jwt = require('jsonwebtoken');
const roleModel = require('../models/roleModel');
const groupModel = require('../models/groupModel');
require('dotenv').config();

/**
 * Middleware to authenticate JWT and extract user info.
 */
async function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // includes user_id, institution_id, email, full_name
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

/**
 * Middleware factory to authorize based on required permission and optional group scope.
 * @param {string} requiredPermission - Permission name required for access
 * @param {boolean} checkScope - Whether to check group membership (default false)
 */
function authorize(requiredPermission, checkScope = false) {
  return async function (req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      // Load all roles of user
      const roles = await roleModel.getRolesByUser(user.user_id);
      if (!roles.length) {
        return res.status(403).json({ success: false, message: 'Forbidden: No roles assigned' });
      }

      // Aggregate permissions from all roles
      let permissions = [];
      for (const role of roles) {
        const rolePermissions = await roleModel.getPermissionsByRole(role.role_id);
        permissions = permissions.concat(rolePermissions.map(p => p.permission_name));
      }
      permissions = [...new Set(permissions)]; // unique permissions

      // Check if user has required permission
      if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
      }

      if (checkScope) {
        // Expect group_id in request (body, query or params)
        const groupId = req.body.group_id || req.query.group_id || req.params.group_id;
        if (!groupId) {
          return res.status(400).json({ success: false, message: 'Missing required group_id for scoped access' });
        }

        // Check user membership in group
        const isMember = await groupModel.checkUserGroupMembership(user.user_id, groupId);
        if (!isMember) {
          return res.status(403).json({ success: false, message: 'Forbidden: Not a member of the specified group' });
        }
      }

      next();

    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
}

module.exports = {
  authenticateJWT,
  authorize,
};
