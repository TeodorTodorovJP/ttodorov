import pool from './pool.js';


const deleteUser = async (userId) => {
  const sql = `
    UPDATE users
    SET is_deleted = 1 
    WHERE (user_id = ?);
    `;
  try {
    await pool.query(sql, [userId]);
  } catch (error) {
    return { message: 'Something went wrong with delete user request.' };
  }
};

const activateUser = async (userId) => {
  const sql = `
    UPDATE users
    SET is_deleted = 0 
    WHERE (user_id = ?);
    `;
  try {
    await pool.query(sql, [userId]);
  } catch (error) {
    return { message: 'Something went wrong with activateUser request.' };
  }
};

const banUser = async (userId, days) => {
  const sql = `
    UPDATE users
    SET is_banned = ? 
    WHERE (user_id = ?)
    `;
  try {
    await pool.query(sql, [days, userId]);
  } catch (error) {
    return { message: 'Something went wrong with banUser request.' };
  }
};

const getUserWithRole = async (uniqueUserName) => {
  const sql = `
  SELECT u.user_id as id, u.unique_user_name as uniqueUserName, r.role_name as role
  FROM users u
  JOIN users_roles r ON u.role_Id = r.role_id
  WHERE u.unique_user_name = ?
    `;
  let result = [];
  try {
    result = await pool.query(sql, [uniqueUserName]);
  } catch (err) {
    return { error: 'Something went wrong with getUserWithRole request.' };
  }

  return result[0];
};

const getUserData = async (uniqueUserName) => {
  const sql = `
  SELECT  u.user_id as userId, u.unique_user_name as uniqueUserName, u.user_name as userName, u.role_id as roleId, u.is_banned as isBanned, u.is_deleted as isDeleted, r.role_name as roleName
  FROM users u
  JOIN users_roles r ON u.role_Id = r.role_id
  WHERE u.unique_user_name = ?
    `;
  let result = [];
  try {
    result = await pool.query(sql, [uniqueUserName]);
  } catch (err) {
    return { error: 'Something went wrong with getUserData request.' };
  }

  return result[0];
};

const getPagesPermissionsById = async (userId) => {
  const sql = `
  SELECT *
  FROM allowed_pages
  WHERE user_id = ?
    `;
  let result = [];
  try {
    result = await pool.query(sql, [userId]);
  } catch (err) {
    return { error: 'Something went wrong with getPagePermissionsById request.' };
  }
  
  return result[0];
};

const getPagePermissionsByPage = async (pageName, userId) => {
  let sql = '';
  if (pageName == 'email')  sql  = `SELECT * FROM page_permissions_email WHERE user_id = ?`;
  if (pageName == 'todo')   sql  = `SELECT * FROM page_permissions_todo WHERE user_id = ?`;

  let result = [];
  try {
    result = await pool.query(sql, [userId]);
  } catch (err) {
    return { error: 'Something went wrong with getPagePermissionsByPage request.' };
  }

  return result[0];
};

export default {
  deleteUser,
  activateUser,
  banUser,
  getUserWithRole,
  getUserData,
  getPagesPermissionsById,
  getPagePermissionsByPage
};
