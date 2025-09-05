/* eslint-disable no-unused-vars */
exports.up = (pgm) => {
  // Roles table
  pgm.createTable('roles', {
    role_id: 'id',
    institution_id: {
      type: 'integer',
      references: '"institutions"',
      onDelete: 'cascade',
      notNull: false,
    },
    role_name: { type: 'varchar(100)', notNull: true },
    description: { type: 'text' },
    created_by: { type: 'integer' }, // user_id who created
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.addConstraint('roles', 'unique_institution_role_name', {
    unique: ['institution_id', 'role_name'],
  });

  // Permissions table
  pgm.createTable('permissions', {
    permission_id: 'id',
    permission_name: { type: 'varchar(100)', notNull: true, unique: true },
    description: { type: 'text' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // role_permissions mapping
  pgm.createTable('role_permissions', {
    role_id: {
      type: 'integer',
      notNull: true,
      references: 'roles',
      onDelete: 'cascade',
    },
    permission_id: {
      type: 'integer',
      notNull: true,
      references: 'permissions',
      onDelete: 'cascade',
    },
  });

  pgm.addConstraint('role_permissions', 'pk_role_permissions', {
    primaryKey: ['role_id', 'permission_id'],
  });

  // user_roles mapping
  pgm.createTable('user_roles', {
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
    },
    role_id: {
      type: 'integer',
      notNull: true,
      references: 'roles',
      onDelete: 'cascade',
    },
  });

  pgm.addConstraint('user_roles', 'pk_user_roles', {
    primaryKey: ['user_id', 'role_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_roles');
  pgm.dropTable('role_permissions');
  pgm.dropTable('permissions');
  pgm.dropTable('roles');
};
