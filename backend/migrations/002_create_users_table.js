/* eslint-disable no-unused-vars */
exports.up = (pgm) => {
  pgm.createTable("users", {
    user_id: "id",
    institution_id: {
      type: "integer",
      notNull: true,
      references: '"institutions"',
      onDelete: "cascade",
    },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    full_name: { type: "varchar(255)", notNull: true },
    phone_number: { type: "varchar(20)" },
    profile_picture_url: { type: "varchar(255)" },
    last_login: { type: "timestamp" },
    reset_password_token: { type: "varchar(255)" },
    reset_password_expires: { type: "timestamp" },
    is_active: { type: "boolean", default: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
