import bcrypt from 'bcrypt';
import { dbTableVolumes } from '../common/dbTableVolumes.js';
import errorStrings from '../common/error-strings.js';
import { userRole } from '../common/user-role.js';
import { searchPlayList } from '../common/searchPlayList.js';


const createUser = (usersData) => {
  return async (username, password) => {
    const existingUser = await usersData.getBy('username', username);

    if (existingUser) {
      if (existingUser.error) {
        return {
          error: existingUser.error,
          user: null,
        };
      }
      return {
        error: errorStrings.users.userAlreadyExists,
        user: null,
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await usersData.create(username, passwordHash, userRole.user);

    if (user.message) {
      return {
        error: user.message,
        user: null,
      };
    }

    return {
      error: null,
      user: user,
    };
  };
};

const signInUser = (usersData) => {
  return async (username, password) => {
    const user = await usersData.getWithRole(username);

    if (user && user.error) {
      return {
        error: user.error,
        user: null,
      };
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        error: errorStrings.users.invalidCredentials,
        user: null,
      };
    }
    return {
      error: null,
      user: user,
    };
  };
};

const getUser = (usersData) => {
  return async (id) => {
    const user = await usersData.getUserInfo(id);

    if (user && user.error) {
      return {
        error: user.error,
        user: null,
      };
    }

    if (user.length === 0) {
      return {
        error: errorStrings.users.invalidUserId,
        user: null,
      };
    }

    if (user[0].profile_pic === null) {
      user[0].profile_pic = 'default.png';
    }

    return {
      error: null,
      user: user[0],
    };
  };
};


const getMyUser = (usersData) => {
  return async () => {
    const user = await usersData.createMyUser();

    if (user && user.error) {
      return {
        error: user.error,
        user: null,
      };
    }

    return {
      error: null,
      user: user,
    };
  };
};


export default {
  signInUser,
  createUser,
  getUser,
  getMyUser
};
