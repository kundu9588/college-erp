/* eslint-disable no-unused-vars */
exports.up = (pgm) => {
  pgm.createTable("institutions", {
    institution_id: "id",
    name: { type: "varchar(255)", notNull: true, unique: true },
    institution_code: { type: "varchar(50)", unique: true },
    address: { type: "text" },
    city: { type: "varchar(100)" },
    state: { type: "varchar(100)" },
    country: { type: "varchar(100)" },
    zip_code: { type: "varchar(20)" },
    phone_number: { type: "varchar(20)" },
    email: { type: "varchar(100)" },
    website_url: { type: "varchar(255)" },
    type: { type: "varchar(50)" },
    status: { type: "boolean", default: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("institutions");
};
