/* eslint-disable no-unused-vars */
exports.up = (pgm) => {
  // attendance_sessions table
  pgm.createTable("attendance_sessions", {
    session_id: "id",
    institution_id: {
      type: "integer",
      notNull: true,
      references: "institutions",
      onDelete: "cascade",
    },
    group_id: {
      type: "integer",
      notNull: true,
      references: "groups",
      onDelete: "cascade",
    },
    session_date: { type: "date", notNull: true },
    session_name: { type: "varchar(255)" },
    created_by: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "restrict",
    },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.addConstraint("attendance_sessions", "unique_group_session_date_name", {
    unique: ["group_id", "session_date", "session_name"],
  });

  // attendance_records table
  pgm.createTable("attendance_records", {
    record_id: "id",
    session_id: {
      type: "integer",
      notNull: true,
      references: "attendance_sessions",
      onDelete: "cascade",
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      onDelete: "cascade",
    },
    status: { type: "varchar(50)", notNull: true }, // e.g., Present, Absent
    remarks: { type: "text" },
    marked_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
  pgm.addConstraint("attendance_records", "unique_session_user", {
    unique: ["session_id", "user_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("attendance_records");
  pgm.dropTable("attendance_sessions");
};
