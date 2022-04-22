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
  console.log("In the correct data");
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

const getPagePermissionsByPageById = async (pageName, userId) => {
  let preSql  = 'SELECT * FROM page_permissions_';
  let postSql = ' WHERE user_id = ?';
  let sql = preSql + pageName + postSql;

  let result = [];
  try {
    result = await pool.query(sql, [userId]);
  } catch (err) {
    return { error: 'Something went wrong with getPagePermissionsByPageById request.' };
  }

  return result[0];
};

const getPagePermissionsForOnePage = async (pageName) => {
  let sql  = 'SELECT * FROM page_permissions_' + pageName;

  let result = [];
  try {
    result = await pool.query(sql);
  } catch (err) {
    return { error: 'Something went wrong with getPagePermissionsForOnePage request.' };
  }

  return result[0];
};

const addPermissionsForPage = async (pageName, permissionsString) => {
  let sql = "CALL add_permissions_for_page(?, ?);";

  let result = [];
  try {
    result = await pool.query(sql, [pageName, permissionsString]);
  } catch (err) {
    return { error: 'Something went wrong with addPermissionsForPage request.' };
  }
  return result[0];
};

const addNewPermissionsForPage = async (pageName, permissionsString) => {
  let sql = "CALL add_new_permissions_for_page(?, ?);";

  let result = [];
  try {
    result = await pool.query(sql, [pageName, permissionsString]);
  } catch (err) {
    return { error: 'Something went wrong with addNewPermissionsForPage request.' };
  }
  return result[0];
};

const getAllPages = async () => {
  let sql = "SELECT * FROM allowed_pages limit 1";

  let result = [];
  try {
    result = await pool.query(sql);
  } catch (err) {
    return { error: 'Something went wrong with getAllPages request.' };
  }
  return result[0];
};

const updatePermissionsForPageForUsers = async (pageName, rolesIds, userIds, mainPagePermission, permissionColumns, permissionValues) => {
  let sql = "CALL update_permissions_for_page_for_users(?, ?, ?, ?, ?, ?);";

  let result = [];
  try {
    result = await pool.query(sql, [pageName, rolesIds, userIds, mainPagePermission, permissionColumns, permissionValues]);
  } catch (err) {
    return { error: 'Something went wrong with getAllPages request.' };
  }
  return result[0];
};

const getAllRolesIds = async () => {
  let sql = "SELECT role_id FROM users_roles;";

  let result = [];
  try {
    result = await pool.query(sql);
  } catch (err) {
    return { error: 'Something went wrong with getAllRolesIds request.' };
  }
  return result[0];
};

const getAllUsersIds = async () => {
  let sql = "SELECT user_id FROM users where user_id not in ('1', '2');";

  let result = [];
  try {
    result = await pool.query(sql);
  } catch (err) {
    return { error: 'Something went wrong with getAllPages request.' };
  }
  return result[0];
};

// CALL add_permissions_for_page('admin_panel', 'view,add_user,get_user,delete_user,ban_user,activate_user,view_pages'); -- add permissions 1 or more -- DONE
// CALL add_new_permissions_for_page('todo', 'test5,test6'); -- add new permissions 1 or more -- DONE
// CALL update_permissions_for_page_for_users('admin_panel', '*', '', 1, 'view,add_user,get_user,delete_user,ban_user,activate_user,view_pages', '1,1,1,1,1,1,1'); -- Update DONE

export default {
  deleteUser,
  activateUser,
  banUser,
  getUserWithRole,
  getUserData,
  getPagesPermissionsById,
  getPagePermissionsByPageById,
  addPermissionsForPage,
  addNewPermissionsForPage,
  getAllPages,
  getPagePermissionsForOnePage,
  updatePermissionsForPageForUsers,
  getAllRolesIds,
  getAllUsersIds
};
