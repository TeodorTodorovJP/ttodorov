import passportJwt from 'passport-jwt';
import { PRIVATE_KEY } from './../config.js';

const options = {
  secretOrKey: 'fg656fsfgwfc3324', // what the secret key is
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  // where to extract the token from
};

// the payload will be injected from the decoded token
const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
  const user = {
    id: payload.sub,
    username: payload.username,
    role: payload.role,
  };

  // the user object will be injected in the request
  // object and can be accessed as req.user in authenticated controllers
  done(null, user);
});

export default jwtStrategy;
