export default {
    uniqueUserName: (value) => (typeof value === 'string' && value.length > 3 && value.length <= 255),
    password: (value) => value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
  };