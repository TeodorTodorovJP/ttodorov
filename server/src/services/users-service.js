import bcrypt from 'bcrypt';
import errorStrings from '../common/error-strings.js';
import { userRole } from '../common/user-role.js';
import createToken from '../auth/create-token.js';

const createUser = (usersData) => {
  return async (inputUserData) => {
    const existingUser = await usersData.getUserBy('unique_user_name', inputUserData.uniqueUserName);

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

    const passwordHash = await bcrypt.hash(inputUserData.password, 10);

    // Needed because the stored function always requires these parameters
    let roleToFill = '';
    if ( userRole[inputUserData.role] ) {
      roleToFill = inputUserData.role;
    } else {
      return {
        error: errorStrings.users.notListedRole,
        user: null,
      };
    }
    const role      = await usersData.getRoleId(roleToFill);
    const isBanned  = '0';
    const isDeleted = '0';
    const picture   = 'picture';

    //uniqueUserName, userName, password, roleId, isBanned, isDeleted, picture
    const user = await usersData.createUser(inputUserData.uniqueUserName, inputUserData.userName, passwordHash, role.role_id, isBanned, isDeleted, picture);

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
  return async (uniqueUserName, password) => {
    const user = await usersData.getUserAndRole(uniqueUserName);

    if (user && user.error) {
      return {
        error: user.error,
        token: null,
      };
    }
    if (!user) {
      return {
        error: errorStrings.users.invalidUserId,
        token: null,
      };
    }

    const userStatus = await usersData.getStatusById(user.id);

    if (userStatus.error) {
      return {
        error: userStatus, 
        token: null
      };
    } 

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        error: errorStrings.users.invalidCredentials,
        token: null,
      };
    }

    const userStatusObj = userStatus[0];

    const payload = {
      sub: user.id,
      uniqueUserName: user.uniqueUserName,
      role: user.role,
      isBanned: userStatusObj.is_banned,
      isDeleted: userStatusObj.is_deleted,
    };
    const token = createToken(payload);

    return {
      error: null,
      token: token
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
