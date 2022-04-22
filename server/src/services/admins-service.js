import errorStrings from '../common/error-strings.js';
import usersData from '../data/users-data.js';

const deleteUser = (adminsData) => {
  return async (userId) => {
    const user = await usersData.getUserBy('user_id', userId);

    if (user === undefined) {
      return { message: 'The user you want to delete does not exist.' };
    }

    if (user.error) {
      return { error: user.error };
    }

    const userInfo = await adminsData.getUserWithRole(user.uniqueUserName);

    if (userInfo && userInfo.error) {
      return userInfo;
    }

    // if (userInfo.role === 'admin') {
    //   return { error: 'You can not delete administrators.' };
    // }

    const deleteUserErr = await adminsData.deleteUser(userId);

    if (deleteUserErr) {
      return deleteUserErr;
    }

    return { message: `The user with username ${user.uniqueUserName} has been deleted.` };
  };
};

const banUser = (adminsData) => {
  return async (userId, days) => {
    const user = await usersData.getUserBy('user_id', userId);

    if (user === undefined) {
      return { message: 'The user you want to ban does not exist.' };
    }

    const userInfo = await adminsData.getUserData(user.uniqueUserName);
    if (userInfo && userInfo.error) {
      return userInfo;
    }

    // if (userInfo.role === 'admin') {
    //   return { message: 'You can\'t ban an administartor.' };
    // }

    const daysBan = new Date(Date.now() + (+days) * 24 * 3600 * 1000);

    const banUserErr = await adminsData.banUser(userId, daysBan);

    if (banUserErr) {
      return banUserErr;
    }

    return { message: `The user with id ${userId} and username ${userInfo.uniqueUserName} has been banned until ${daysBan}.` };
  };
};

const getUser = (adminsData) => {
  return async (uniqueUserName) => {
    const user = await adminsData.getUserWithRole(uniqueUserName);

    if (user && user.error) {
      return user;
    }
    if (!user) {
      return { message: errorStrings.users.invalidUserId };
    }

    return { user: user };
  };
};

const activateUser = (adminsData) => {
  return async (uniqueUserName) => {

    const user = await adminsData.getUserData(uniqueUserName);
    if (user && user.error) {
      return user;
    }
    if (!user) {
      return { message: errorStrings.users.invalidUserId };
    }

    if (user.isDeleted == 0) {
      return {message: 'The user is already active!'}
    }

    const activatedUser = await adminsData.activateUser(user.userId);

    if (activatedUser && activatedUser.error) {
      return activatedUser;
    }

    return {message: 'The user is activated again.'};
  };
};

const addPermissionsForPage = (adminsData) => {
  return async (pageName, permissions) => {

    const allPages = await adminsData.getAllPages();
    let page = '';

    const allPagesArr = Object.keys(allPages).filter(page => page != 'user_id');

    if (allPagesArr.includes(pageName)) {
      let oldPagePermissionsObj = await adminsData.getPagePermissionsForOnePage(pageName);

      let oldPagePermissionsObjArr = Object.keys(oldPagePermissionsObj);
      const newPermissions = permissions.filter(permission => {
        if (!oldPagePermissionsObjArr.includes(permission)) {
          return permission;
        }
      })
      if (newPermissions.length > 0) {
        let permissionsString = newPermissions.join(',');
        page = await adminsData.addNewPermissionsForPage(pageName, permissionsString);
      }
    } else {
      let permissionsString = permissions.join(',');
      page = await adminsData.addPermissionsForPage(pageName, permissionsString);
    }


    if (page && page.error) {
      return user;
    }
    if (!page) {
      return { message: errorStrings.users.invalidUserId };
    }

    return {message: `Page permissions for ${pageName} have been added.`};
  };
};

const updatePermissionsForPageForUsers = (adminsData) => {
  return async (pageName, rolesIds, userIds, mainPagePermission, permissionColumns, permissionValues) => {
    // Update the permissions for any number of users for single page
    // users can be '*' for all users
    // 'id' for single user
    // 'id,id,id' for multiple users
    // can pass roles_ids that will be added to the user_ids
		// roles_ids can be *, single id and multiple ids
    // The number of columns and number of values have to match

    const allPages = await adminsData.getAllPages();

    const allPagesArr = Object.keys(allPages).filter(page => page != 'user_id');

    if (!allPagesArr.includes(pageName)) {
      return {error: `Page ${pageName} does not exist.`};
    }

    // validate if you have the rights to change the permissions

    // Validate roles ids
    const allUsersIds = await adminsData.getAllRolesIds();
    const allUsersIdsArr = Object.keys(allUsersIds).filter(page => page != 'user_id');

    if (!allUsersIds.includes(pageName)) {
      return {error: `Page ${pageName} does not exist.`};
    }

    // Validate users ids
    // Validate permissionColumns
    // Validate values for permissionColumns

    const rolesIdsString          = rolesIds.join(',');
    const userIdsString           = userIds.join(',');
    const permissionColumnsString = permissionColumns.join(',');
    const permissionValuesString  = permissionValues.join(',');

    const updated = await adminsData.updatePermissionsForPageForUsers(pageName, rolesIdsString, userIdsString, mainPagePermission, permissionColumnsString, permissionValuesString);

    if (updated && updated.error) {
      return user;
    }
    if (!updated) {
      return { message: errorStrings.users.invalidUserId };
    }

    return {message: `Page permissions for ${pageName} have been added.`};
  };
};

export default {
  deleteUser,
  banUser,
  getUser,
  activateUser,
  addPermissionsForPage,
  updatePermissionsForPageForUsers
};
