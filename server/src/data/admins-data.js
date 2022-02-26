import pool from './pool.js';


const deleteUser = async (userId) => {
  const sql = `
    UPDATE users
    SET is_deleted = 1 
    WHERE (id = ?);
    `;
  try {
    await pool.query(sql, [userId]);
  } catch (error) {
    return { message: 'Something went wrong with delete user request.' };
  }
};

const ban = async (userId, days) => {
  const sql = `
    UPDATE users
    SET is_banned = ? 
    WHERE (id = ?)
    `;
  try {
    await pool.query(sql, [days, userId]);
  } catch (error) {
    return { message: 'Something went wrong with ban user request.' };
  }
};

const liftBan = async (userId) => {
  const sql = `
    UPDATE users
    SET is_banned = NULL
    WHERE (id = ?)
    `;
  try {
    await pool.query(sql, [userId]);
  } catch (error) {
    return { message: 'Something went wrong with lift ban request.' };
  }
};

const getUserWithRole = async (userName) => {
  const sql = `
    SELECT u.id, u.username, u.is_banned, u.is_deleted, u.profile_pic, r.name as role
    FROM users u
    JOIN roles r ON u.roles_Id = r.id
    WHERE u.username = ?
    `;
  let result = [];
  try {
    result = await pool.query(sql, [userName]);
  } catch (err) {
    return { error: 'Something went wrong with getBy request.' };
  }

  return result[0];
};

export default {
  deleteUser,
  ban,
  liftBan,
  getUserWithRole
};
