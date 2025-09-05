const db = require("../config/db");

async function createSession({
  institution_id,
  group_id,
  session_date,
  session_name,
  created_by,
}) {
  const query = `
    INSERT INTO attendance_sessions (institution_id, group_id, session_date, session_name, created_by)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (group_id, session_date, session_name) DO UPDATE SET created_at = CURRENT_TIMESTAMP
    RETURNING *`;
  const values = [
    institution_id,
    group_id,
    session_date,
    session_name || null,
    created_by,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function markAttendanceRecords(session_id, records) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    for (const record of records) {
      const { user_id, status, remarks } = record;
      await client.query(
        `INSERT INTO attendance_records (session_id, user_id, status, remarks)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (session_id, user_id) DO UPDATE SET status = EXCLUDED.status, remarks = EXCLUDED.remarks, marked_at = CURRENT_TIMESTAMP`,
        [session_id, user_id, status, remarks || null]
      );
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

async function getAttendanceRecords(session_id) {
  const query = `
    SELECT ar.*, u.full_name, u.email FROM attendance_records ar
    JOIN users u ON ar.user_id = u.user_id
    WHERE ar.session_id = $1`;
  const { rows } = await db.query(query, [session_id]);
  return rows;
}

module.exports = {
  createSession,
  markAttendanceRecords,
  getAttendanceRecords,
};
