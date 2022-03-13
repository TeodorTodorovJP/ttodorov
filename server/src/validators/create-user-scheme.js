export default {
  uniqueUserName: (value) => (typeof value === 'string' && value.length > 3 && value.length <= 255),
  userName: (value) => (typeof value === 'string' && value.length > 3 && value.length <= 50),
  password: (value) => value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
};
// unique_user_name, user_name, password, role_id, is_banned, is_deleted, picture