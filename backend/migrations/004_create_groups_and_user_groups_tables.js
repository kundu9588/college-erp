/* eslint-disable no-unused-vars */
exports.up = (pgm) => {
  pgm.createTable("groups", {
    group_id: "id",
    institution_id: {
      type: "integer",
      notNull: true,
      references: "institutions",
      onDelete: "cascade",
    },
    group_name: { type: "varchar(255)", notNull: true },
    group_type: { type: "varchar(100)" }, // e.g., 'class', 'department'
    parent_group_id: {
      type: "integer",
      references: "groups",
      onDelete: "set null",
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  pgm.addConstraint("groups", "unique_group_name_per_institution", {
    unique: ["institution_id", "group_name"],
  });

  pgm.createTable("user_groups", {
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    group_id: {
      type: "integer",
      notNull: true,
      references: "groups",
      onDelete: "cascade",
    },
  });

  pgm.addConstraint("user_groups", "pk_user_groups", {
    primaryKey: ["user_id", "group_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("user_groups");
  pgm.dropTable("groups");
};
