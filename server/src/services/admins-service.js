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
    if (isNaN(days)) {
      return { error: 'You have to specify numbers as days to be banned.' };
    }
    const user = await usersData.getUserBy('id', userId);

    if (user === undefined) {
      return { message: 'The user you want to ban does not exist.' };
    }

    const userInfo = await usersData.getUserAndRole(user.username);

    if (userInfo && userInfo.error) {
      return userInfo;
    }

    // if (userInfo.role === 'admin') {
    //   return { message: 'You can\'t ban an administartor.' };
    // }

    const daysBan = new Date(Date.now() + (+days) * 24 * 3600 * 1000);

    const banUserErr = await adminsData.ban(userId, daysBan);

    if (banUserErr) {
      return banUserErr;
    }

    return { message: `The user with id ${userId} and username ${userInfo.username} has been banned until ${daysBan}.` };
  };
};

const banLifter = (adminsData) => {
  return async (id) => {
    const user = await usersData.getStatusById(id);

    if (user.error) {
      return user;
    }

    if (!user[0]) {
      return { message: 'The user you want to unban does not exist.' };
    }

    if (user[0].is_banned === null ) {
      return { message: 'The user you want to unban is not banned.' };
    }

    const userInfo = await usersData.getUserBy('id', id);

    if (userInfo && userInfo.error) {
      return { userInfo };
    }

    const liftBanErr = await adminsData.liftBan(id);

    if (liftBanErr) {
      return liftBanErr;
    }

    return { message: `User with id ${id} and username ${userInfo.username} has been unbanned` };
  };
};

const getUser = (adminsData) => {
  return async (userName) => {

    const user = await adminsData.getUserWithRole(userName);

    if (user && user.error) {
      return { user };
    }
    if (!user) {
      return { message: errorStrings.users.invalidUserId };
    }

    return {user: user};
  };
};

export default {
  deleteUser,
  banUser,
  banLifter,
  getUser
};
