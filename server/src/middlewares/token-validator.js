import usersData from '../data/users-data.js';

export default async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const tokenStatus = await usersData.isTokenDeactivated(token);

  if (tokenStatus.error) {
    return res.status(404).send(tokenStatus);
  }

  if (!(tokenStatus)) {
    return res.status(401).send({ error: 'You are not logged in.' });
  }

  await next();
};
