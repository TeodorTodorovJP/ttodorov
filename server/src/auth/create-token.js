import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  const token = jwt.sign(
      payload,
      'fg656fsfgwfc3324'
  );

  return token;
};


export default createToken;
