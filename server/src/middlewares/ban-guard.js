import adminsData from '../data/admins-data.js';
import usersData from '../data/users-data.js';

export default async (req, res, next) => {
  const user = await usersData.getStatusById(req.user.id);

  if (user.error) {
    return res.status(404).send(user);
  }

  const userStatus = user[0];

  if (+userStatus.is_banned > 0) {
    const banDate = new Date(userStatus.is_banned);

    if (banDate.valueOf() > Date.now()) {
      return res.status(403).send( { message: `Your account has been suspended until ${banDate}` });
    }

    const liftBanErr = await adminsData.liftBan(req.user.id);

    if (!liftBanErr) {
      return res.status(400).send(liftBanErr);
    }
  }

  if (userStatus.is_deleted) {
    return res.status(403).send( { message: 'You account is deleted, for more information, contact our support.' });
  }

  await next();
};
