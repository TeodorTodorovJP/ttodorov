import express from 'express';
import { authMiddleware, roleMiddleware } from '../auth/auth.middleware.js';
import { userRole } from '../common/user-role.js';
import adminsData from '../data/admins-data.js';
import usersData from '../data/users-data.js';
import tokenValidator from '../middlewares/token-validator.js';
import adminsService from '../services/admins-service.js';
import usersService from '../services/users-service.js';
import bodyValidator from '../middlewares/body-validator.js';
import updatePlayListScheme from '../validators/update-playList-scheme.js';
import banGuard from '../middlewares/ban-guard.js';
import banUserScheme from '../validators/ban-user-scheme.js';

const adminsController = express.Router();

adminsController.use(authMiddleware);
adminsController.use(banGuard);
adminsController.use(tokenValidator);
adminsController.use(roleMiddleware(userRole.admin));

adminsController
  .get('/user', async (req, res) => {
    const { uniqueUserName } = req.body;

    const { error, user, message } = await adminsService.getUser(adminsData)(uniqueUserName);

    if (error) {
      res.status(400).send({ error });
    } else if (message) {
      res.status(404).send({message});
    } else {
      res.status(200).send(user);
    }
  })
  .delete('/user', async (req, res) => {
    const { id } = req.body;

    const result = await adminsService.deleteUser(adminsData)(id);

    res.send(result);
  })
  .post('/ban', bodyValidator('admins', banUserScheme, 'ban'), async (req, res) => {
    const { id, days } = req.body;

    const result = await adminsService.banUser(adminsData)(id, days);

    res.send(result);
  })
  .delete('/activate/user', async (req, res) => {
    const { uniqueUserName } = req.body;

    const result = await adminsService.activateUser(adminsData)(uniqueUserName);

    if (result.error) {
      res.status(400).send(result.error);
    } else if (result.message) {
      res.status(404).send(result.message);
    } else {
      res.status(200).send(result);
    }
  })
  .post('/liftban', async (req, res) => {
    const { id } = req.body;

    const result = await adminsService.banLifter(adminsData)(id);

    res.send(result);
  });



export default adminsController;
