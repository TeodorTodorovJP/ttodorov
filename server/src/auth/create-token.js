import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  const token = jwt.sign(
      payload,
      'privateKey'
  );

  return token;
};


export default createToken;
