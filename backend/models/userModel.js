const db = require("../config/db");

async function createUser({
  institution_id,
  email,
  password,
  full_name,
  phone_number,
  profile_picture_url,
}) {
  const queryText = `
    INSERT INTO users (institution_id, email, password, full_name, phone_number, profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [
    institution_id,
    email,
    password,
    full_name,
    phone_number,
    profile_picture_url,
  ];

  const { rows } = await db.query(queryText, values);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
}

async function findUserById(user_id) {
  const { rows } = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
    user_id,
  ]);
  return rows[0];
}

async function updateUserLastLogin(user_id) {
  const queryText = `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1`;
  await db.query(queryText, [user_id]);
}

async function updateUserPassword(user_id, hashedPassword) {
  const queryText = `UPDATE users SET password = $1 WHERE user_id = $2`;
  await db.query(queryText, [hashedPassword, user_id]);
}

async function deactivateUser(user_id) {
  const queryText = `UPDATE users SET is_active = FALSE WHERE user_id = $1`;
  await db.query(queryText, [user_id]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserLastLogin,
  updateUserPassword,
  deactivateUser,
};
