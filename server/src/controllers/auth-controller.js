import express from 'express';
import createToken from '../auth/create-token.js';
import usersData from '../data/users-data.js';
import usersService from '../services/users-service.js';
import bodyValidator from '../middlewares/body-validator.js';
import signInUserScheme from '../validators/sign-in-user-scheme.js';
import banGuard from '../middlewares/ban-guard.js';

const authController = express.Router();

authController

    .post('/signin', bodyValidator('signin', signInUserScheme), async (req, res) => {
      // Test object for postman
      // {
      //   "uniqueUserName": "Teodor", "password": "myPass23*"
      // }
      const { uniqueUserName, password } = req.body;
      
      const { error, token } = await usersService.signInUser(usersData)(uniqueUserName, password);
      
      if (error) {
        return res.status(400).send( { error: error });
      } else {
        return res.status(200).send( {token: token} );
      }
      
    });


export default authController;
