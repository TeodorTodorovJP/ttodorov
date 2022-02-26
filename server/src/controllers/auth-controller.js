import express from 'express';
import createToken from '../auth/create-token.js';
import usersData from '../data/users-data.js';
import usersService from '../services/users-service.js';


const authController = express.Router();

authController

    .post('/signin', async (req, res) => {
      const { username, password } = req.body;

      const { error, user } = await usersService.signInUser(usersData)(username, password);

      if (error) {
        return res.status(400).send( { error: error });
      }

      const userStatus = await usersData.getStatusById(user.id);

      if (userStatus.error) {
        return res.status(404).send(user);
      } 
      const userStatusObj = userStatus[0];

      if (error) {
        res.status(400).send( { error: error });
      } else {
        const payload = {
          sub: user.id,
          username: user.username,
          role: user.role,
          isBanned: userStatusObj.is_banned,
          isDeleted: userStatusObj.is_deleted,
        };
        const token = createToken(payload);

        res.status(200).send({
          token: token,
        });
      }
    });


export default authController;
