const db = require("../config/db");

// Create a new role for an institution
async function createRole({
  institution_id,
  role_name,
  description,
  created_by,
}) {
  const query = `
    INSERT INTO roles (institution_id, role_name, description, created_by)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [institution_id, role_name, description, created_by];
  const { rows } = await db.query(query, values);
  return rows[0];
}

// Fetch all roles for an institution
async function getRolesByInstitution(institution_id) {
  const query = `SELECT * FROM roles WHERE institution_id = $1 ORDER BY role_name`;
  const { rows } = await db.query(query, [institution_id]);
  return rows;
}

// Assign permission(s) to a role
async function assignPermissionsToRole(role_id, permission_ids) {
  const insertQueries = permission_ids.map((permission_id) =>
    db.query(
      `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [role_id, permission_id]
    )
  );
  await Promise.all(insertQueries);
}

// Get permissions for a role
async function getPermissionsByRole(role_id) {
  const query = `
    SELECT p.* FROM permissions p
    JOIN role_permissions rp ON p.permission_id = rp.permission_id
    WHERE rp.role_id = $1`;
  const { rows } = await db.query(query, [role_id]);
  return rows;
}

// Assign role(s) to a user
async function assignRolesToUser(user_id, role_ids) {
  const insertQueries = role_ids.map((role_id) =>
    db.query(
      `INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [user_id, role_id]
    )
  );
  await Promise.all(insertQueries);
}

// Get roles assigned to a user
async function getRolesByUser(user_id) {
  const query = `
    SELECT r.* FROM roles r
    JOIN user_roles ur ON r.role_id = ur.role_id
    WHERE ur.user_id = $1`;
  const { rows } = await db.query(query, [user_id]);
  return rows;
}

module.exports = {
  createRole,
  getRolesByInstitution,
  assignPermissionsToRole,
  getPermissionsByRole,
  assignRolesToUser,
  getRolesByUser,
};
