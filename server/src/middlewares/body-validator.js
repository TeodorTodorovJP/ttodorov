import errorStrings from '../common/error-strings.js';

export default (resource, validator, urlId) => (req, res, next) => {
  const errors = [];
  try {
    Object.keys(validator).forEach((key) => {

      if ( !req.body[key] ) {
        throw Error("");
      }

      if (!validator[key](req.body[key])) {
        errors.push(errorStrings[resource][key]);
      }
    });

    if (errors.length === 0) {
      next();
    } else {
      return res.status(400).send({ error: errors });
    }
  } catch (err) {
    res.status(400).send({ error: 'Seems like you are trying to pass invalid data.', example: errorStrings.expectedBody[resource][urlId] });
  }
};
