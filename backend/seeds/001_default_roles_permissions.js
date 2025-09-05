const db = require("../config/db");

async function seedDefaultRolesPermissions(
  institution_id = null,
  adminUserId = null
) {
  // Define default permissions
  const permissions = [
    {
      permission_name: "manage_users",
      description: "Create, update, delete users",
    },
    { permission_name: "view_reports", description: "View system reports" },
    {
      permission_name: "manage_roles",
      description: "Create and manage roles and permissions",
    },
    {
      permission_name: "take_attendance",
      description: "Manage attendance records",
    },
    {
      permission_name: "manage_courses",
      description: "Create and manage courses",
    },
    // Add more as needed...
  ];

  // Insert permissions (ignore duplicates)
  for (const perm of permissions) {
    await db.query(
      `INSERT INTO permissions (permission_name, description)
       VALUES ($1, $2) ON CONFLICT (permission_name) DO NOTHING`,
      [perm.permission_name, perm.description]
    );
  }

  // Insert default roles for the institution
  const roles = [
    {
      role_name: "admin",
      description: "Full access to all institution features",
    },
    { role_name: "teacher", description: "Can manage classes and attendance" },
    { role_name: "student", description: "Limited access to own data" },
  ];

  for (const role of roles) {
    const { rows } = await db.query(
      `INSERT INTO roles (institution_id, role_name, description, created_by)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (institution_id, role_name) DO NOTHING
       RETURNING *`,
      [institution_id, role.role_name, role.description, adminUserId]
    );

    if (rows.length) {
      const roleId = rows[0].role_id;

      // Assign permissions to roles
      let permsForRole = [];
      switch (role.role_name) {
        case "admin":
          permsForRole = permissions.map((p) => p.permission_name); // all permissions
          break;
        case "teacher":
          permsForRole = ["take_attendance", "manage_courses"];
          break;
        case "student":
          permsForRole = [];
          break;
      }

      for (const permName of permsForRole) {
        await db.query(
          `INSERT INTO role_permissions(role_id, permission_id)
           SELECT $1, permission_id FROM permissions WHERE permission_name = $2
           ON CONFLICT DO NOTHING`,
          [roleId, permName]
        );
      }
    }
  }
}

module.exports = seedDefaultRolesPermissions;
