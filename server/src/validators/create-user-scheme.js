export default {
  username: (value) => (typeof value === 'string' && value.length > 3 && value.length < 20),
  password: (value) => value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/),
};
