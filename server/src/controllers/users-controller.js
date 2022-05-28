import express from 'express';
import usersData from '../data/users-data.js';
import bing from '../services/bing.js';
import usersService from '../services/users-service.js';
import { authMiddleware } from '../auth/auth.middleware.js';
import bodyValidator from '../middlewares/body-validator.js';
import createUserScheme from '../validators/create-user-scheme.js';
import tokenValidator from '../middlewares/token-validator.js';
import banGuard from '../middlewares/ban-guard.js';
import { upload } from '../middlewares/file-uploader.js';
import jwt_decode from "jwt-decode";

const usersController = express.Router();
//usersController.use(permissionsDecorator);

usersController
  //Test register with:
  // {
  //   "uniqueUserName": "Teodor", "userName": "Teodor", "password": "myPass23*"
  // }
  .post(
    "/register",
    bodyValidator("users", createUserScheme),
    async (req, res) => {
      const inputUserData = req.body;

      const { error, user } = await usersService.createUser(usersData)(
        inputUserData
      );

      if (error) {
        res.status(409).send({ error: error });
      } else {
        res.status(201).send(user);
      }
    }
  )
  .get("/getmyuser", async (req, res) => {
    const { error, user } = await usersService.getMyUser(usersData)();

    if (error) {
      res.status(409).send({ error: error });
    } else {
      res.status(201).send(user);
    }
  })
  .delete("/logout", authMiddleware, tokenValidator, async (req, res) => {
    const result = await usersData.logout(
      req.headers.authorization.replace("Bearer ", "")
    );

    if (result) {
      res.status(404).send(result);
    } else {
      res.send({ message: "Successfully logged out" });
    }
  })
  .delete("/resign/", authMiddleware, tokenValidator, async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const tokenData = jwt_decode(token);
    const { uniqueUserName, password } = req.body;
    const result = await usersService.resign(usersData)(
      tokenData,
      uniqueUserName,
      password
    );

    if (result.error) {
      res.status(404).send(result);
    } else {
      res.send(result.message);
    }
  })
  .put(
    "/avatar",
    authMiddleware,
    tokenValidator,
    banGuard,
    upload("avatars").single("avatar"),
    async (req, res) => {
      const userId = req.user.id;

      const avatarName = await usersData.updateAvatar(
        userId,
        req.file.filename
      );

      if (avatarName.error) {
        res.status(404).send(avatarName);
      } else {
        res.json({ message: `Avatar updated: ${avatarName}` });
      }
    }
  )
  .get(
    "/addresses",
    authMiddleware,
    tokenValidator,
    banGuard,
    async (req, res) => {
      const queries = req.query;
      const { error, result } = await bing(queries);

      if (error) {
        res.status(409).send({ error: error });
      } else {
        res.status(201).send({
          duration: result.travelDuration,
          trafficDuration: result.travelDurationTraffic,
        });
      }
    }
  )
  .get("/getData", async (req, res) => {
    const result = await usersData.getData();
    if (!result.error) {
      res.status(200).send(result);
    } else {
      res.send({ message: result.error });
    }
  })

  .post("/storeData", async (req, res) => {
    const { type, description } = req.body;

    const result = await usersData.storeData(type, description);

    if (!result.error) {
      res.status(200).send(result);
    } else {
      res.send({ message: result.error });
    }
  })

  .get("/user", async (req, res) => {
    const { id } = req.body;

    const { error, user } = await usersService.getUser(usersData)(id);

    if (error) {
      res.status(400).send({ error });
    } else {
      res.send(user);
    }
  });

export default usersController;
