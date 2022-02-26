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
import banGuard from '../middlewares/ban-guard.js'

const adminsController = express.Router();

adminsController.use(authMiddleware);
adminsController.use(banGuard);
adminsController.use(tokenValidator);
adminsController.use(roleMiddleware(userRole.admin));

adminsController
  .get('/users/:username', async (req, res) => {
    const { username } = req.params;

    const { error, user, message } = await adminsService.getUser(adminsData)(username);

    if (error) {
      res.status(400).send({ error });
    } else if (message) {
      res.status(404).send({message});
    } else {
      res.status(200).send(user);
    }
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await adminsService.deleteUser(adminsData)(id);

    res.send(result);
  })
  .post('/:id/ban/:days', async (req, res) => {
    const { id, days } = req.params;

    const result = await adminsService.banUser(adminsData)(id, days);

    res.send(result);
  })
  .post('/liftban/:id', async (req, res) => {
    const { id } = req.params;

    const result = await adminsService.banLifter(adminsData)(id);

    res.send(result);
  })

  .delete('/playlists/:id', async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    const { error, playList } = await usersService.deletePlayList(usersData)(id, user);

    if (error) {
      res.status(400).send({ error });
    } else {
      res.status(200).send({ playList });
    }
  })

  .patch('/playlists/:id', bodyValidator('playLists', updatePlayListScheme), async (req, res) => {
    const { id } = req.params;
    const playListData = req.body;
    const user = req.user;

    const { error, playList } = await usersService.updatePlayListById(usersData)(id, playListData, user);

    if (error) {
      res.status(400).send({ error });
    } else {
      res.status(200).send({ playList });
    }
  });


export default adminsController;
